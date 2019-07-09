#Middleware for the AI bot
from ibm_watson import DiscoveryV1
import json
import config as cf
import secrets
import sys
import nltk
from sklearn.naive_bayes import GaussianNB
import vectorize
from compositeBayes import CompositeBayes

MIN_DATA_REQUIRED = 5
SEL_FILE = "selects.json"
REJ_FILE = "rejects.json"
WORD_BANK_FILE = "wordBank.json"
BAYES_DATA_FILE = "bayesData.json"

"""
Activity JSON object
{
    Type: ""
    Title: ""
    BayesDescription: ""
    Name: ""
    Description: ""
    Category: {0 --none, 1 --rejected, 2 -- selected}
}
"""

class Bayes:

    selections = []
    rejections = []
    model = None
    selectionFile = ""
    rejectionFile = ""
    wordBankFile = ""
    bayesDataFile = ""
    wordBank = []
    types = dict()

    def __init__(self):
        #TODO: Write save and load data functions
        self.selectionFile = SEL_FILE
        self.rejectionFile = REJ_FILE
        self.wordBankFile = WORD_BANK_FILE
        self.bayesDataFile = BAYES_DATA_FILE
        self.model = CompositeBayes()
        self.loadData()

    def saveData(self):
        #Write Data to file filename
        #selectFile = open(SEL_FILE,"a")
        #rejectFile = open(REJ_FILE,"a")

        with open(SEL_FILE, 'w') as a:
            json.dump(self.selections, a)

        with open(REJ_FILE, 'w') as b:
            json.dump(self.rejections, b)

        with open(self.wordBankFile, 'w') as f:
            temp = {"Words":self.workBank}
            json.dump(temp, f)

        with open(self.bayesDataFile,'w') as f:
            json.dump(self.types, f)

    def loadData(self):
        #Read data from file filename into selections and rejections accordingly
        with open(SEL_FILE) as a:
            temp = json.load(a)
            if len(temp) == 0:
                self.selections = []
            else:
                self.selections = temp
        with open(REJ_FILE) as b:
            temp = json.load(b)
            if len(temp) == 0:
                self.rejections = []
            else:
                self.rejections = temp
        with open(self.wordBankFile) as f:
            temp = json.load(f)
            self.wordBank = temp["Words"]

        with open(self.bayesDataFile) as f:
            self.types = json.load(f)


    def countData(self):
        if len(self.selections) < MIN_DATA_REQUIRED or len(self.rejections) < MIN_DATA_REQUIRED:
            return False
        else:
            return True

    def parseItems(self, data):
        vecs = vectorize.parse(data, self.types, self.wordBank)
        return vecs

    def vectorizeItems(self, data):
        return vectorize.vectorize(data)

    #results is an array-like structure of discovery results
    def getPredictions(self, results):

        types = []
        titles = []
        descs = []
        for key in results:
            types.append(key[0])
            titles.append(key[1])
            descs.append(key[2])

        return self.model.compositePredict(types,titles,descs)

    #Using the new data, updates the probabilities
    def fitData(self):
        vectorizedData = vectorizeItems(self.selections.extend(self.rejections))

        types = []
        titles = []
        descs = []
        cats = []
        for key in vectorizedData:
            types.append(key[0])
            titles.append(key[1])
            descs.append(key[2])
            cats.append(vectorizedData[key])

        self.model.compositeFit(types,titles,descs, cats)

def formatData(data):
    formatted = {
        "Type": data["Type"],
        "Title": data["Title"],
        "BayesDescription": data["Description"],
        "Name": "",
        "Description": "",
        "Category": 0
    }
    return formatted

def getFeedback(feedback):
    bayes = Bayes()

    feedback = json.loads(feedback)

    for activity in feedback:
        if activity["Category"] == 1:
            bayes.rejections.append(activity)
        elif activity["Category"] == 2:
            bayes.selections.append(activity)


    bayes.saveData()
    return True

def middleware(responses, mood):

    #Initialize bayes object and load in files
    bayes = Bayes()
    bayes.loadData()

    discovery = DiscoveryV1(version=cf.version,iam_apikey=cf.apikey,url=cf.url)

    #Load json object into python object
    data = json.loads(responses)

    timeLimit = get_minutes(data)

    results = [] #Object containing the json objects of all results returned
    correctList = []
    #Parse into keywords and make query
    for topic in data["Topics"]:
        keywords = []
        if data[topic] is "No":
            continue

        for catagory in data["Liked" + topic]:
            keywords.append(catagory)

        response = makeQuery(keywords, discovery, topic)
        res = response.result["results"];

        time_filter(res, timeLimit, correctList)

    #Run naive bayes
    if bayes.countData():
        #Perform Naive Bayes
        formattedList = [formatData(correctList[i]) for i in range(len(correctList))]

        parsedList = bayes.parseItems(formattedList)

        bayes.fitData()

        vectorizedList = bayes.vectorizeItems(parsedList)

        guesses = bayes.getPredictions(vectorizedList)

        filteredList = [correctList[i] for i in range(len(correctList)) if guesses[i] == 2]
        parsedList = [parsedList[i] for i in range(len(parsedList)) if guesses[i] == 2]

        returns = get_response(filteredList, parsedList)

        bayes.saveData()

        return returns


    #Convert json objects into something not terrible for reading
    return get_response(correctList)

def makeQuery(keywords, discovery, topic):
    result = None

    filterParam = "extracted_metadata.filename:\"" + topic + "\""

    result = discovery.query(environment_id = cf.env_id, collection_id = cf.col_id, filter = filterParam,
        query = ' '.join(keywords), count = cf.NUM_RESULTS)

    return result

"""
    filter = excludes docs that don't mention filter
    query = the query
    natural_language_query = the query but using natural language processing
    passages = T/F returns most relevant passages from results
    aggregation = combines query search with filters
    count = # of results to return
"""


# get bored minutes
def get_minutes(data):

    time = data["Time"]
    hours = time["hours"]
    minutes = time["minutes"]

    totalTime = (int(hours) * 60) + int(minutes)

    return totalTime


# get movies infos from watson response
#[{"Name":Name, "Description":Description}, {"Name":Name, "Description":Description}, ...]
def get_response(responses, parsedList = None):
    activities = []
    type = ""
    title = ""
    bayesDescription = ""
    name = ""
    description = ""

    nolist = False
    if parsedList is None:
        parsedList = responses
        nolist = True

    for result,activity in zip(responses,parsedList):
        if "movie" in result["Type"]:
            title = result["Title"]
            year = result["Year"]
            runtime = result["Runtime"]
            genre = result["Genre"]
            bayesDescription = result["Description"]

            typ = "Movie"

            name = "Movie: " + title
            description = year + "; " + runtime + " minutes; " + genre + ";\n" + bayesDescription

        elif "Recipe" in result["Type"]:
            title = result["Title"]
            preptime = str(int(result["preptime"]) + int(result["cooktime"]))
            servings = str(result["servings"])
            calories = str(result["calories"])
            ingredients = ', '.join(result["ingredients"])
            bayesDescription = result["Description"]

            typ = "Recipe"

            name = "Recipe: " + title
            description = ("Preptime: " + preptime + "; Servings: "
                 + servings + "; Calories: " + calories + ";\nIngredients: "
                 + ingredients + ";\nInstructions: " + bayesDescription)

        elif "Joke" in result["Type"]:
            title = result["Title"]
            bayesDescription = result["Description"]

            typ = "Joke"

            name = "Joke: " + title
            description = bayesDescription

        elif "game" in result["Type"]:
            title = result["Title"]
            genre = result["Genre"]
            bayesDescription = result["Description"]

            typ = "Game"

            name = "Game: " + title
            description = "Genre: " + genre + ";\nSummary: " + bayesDescription

        elif "Riddle" in result["Type"]:
            bayesDescription = result["Description"]
            title = result["Title"]

            typ = "Riddle"

            name = "Riddle: " + title
            description = "Answer: " + description

        elif "Video" in result["Type"]:
            bayesDescription = result["Description"]
            title = result["Title"]
            link = result["Link"]
            thumbnail = result["Thumbnail"]

            typ = "Video"

            name = "Video: " + title
            description = "Summary: " + bayesDescription + ";\nLink: " + link

        category = 0

        activity = dict()
        if nolist:
            activity = {"Type":typ, "Title":title, "BayesDescription":bayesDescription, "Name":name, "Description":description, "Category":category}
        else:
            activity = {"Type":activity["Type"], "Title":activity["Title"], "BayesDescription":activity["BayesDescription"],"Name":name, "Description":description, "Category":category}

        activity = json.dumps(activity)
        activity = json.loads(activity)
        activities.append(activity)

    return json.dumps(activities)


def time_filter(res, timeLimit, correctList):
    for result in res:
        if 'Runtime' in result.keys():
            if int(result["Runtime"]) < timeLimit:
                correctList.append(result)
        elif 'calories' in result.keys():
            total = result["preptime"]+result["waittime"]+result["cooktime"]
            if total < timeLimit:
                correctList.append(result)


#with open("InputJSON.json","r") as js:
#    print(middleware(js.read().replace('\n',''),"bad"))
