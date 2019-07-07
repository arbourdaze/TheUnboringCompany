#Middleware for the AI bot
from ibm_watson import DiscoveryV1
import json
import config as cf
import secrets
import sys
import nltk
import gensis
from sklearn.naive_bayes import GaussianNB
import vectorize

MIN_DATA_REQUIRED = 5
SEL_FILE = ""
REJ_FILE = ""
WORD_BANK_FILE = ""

"""
Activity JSON object
{
    ID: ""
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
    model = GaussianNB()
    selectionFile = ""
    rejectionFile = ""
    wordBankFile = ""
    wordBank = []

    def __init__ (self):
        #TODO: Write save and load data functions
        selectionFile = SEL_FILE
        rejectionFile = REJ_FILE
        wordBankFile = WORD_BANK_FILE
        self.loadData()
        if self.countData():
            self.fitData()

    def saveData(self, feedback):
        #Write Data to file filename
        #selectFile = open(SEL_FILE,"a")
        #rejectFile = open(REJ_FILE,"a")
        responseData = json.loads(feedback)
        with open(SEL_FILE) as f
            selectionData = json.load(f)

        with open(REJ_FILE) as g
            rejectionData = json.load(g)

        for key in data.items():
            if key["Category"] == 1:
                rejectionData.update(key)
            elif key["Category"] == 2:
                selectionData.update(key)
            else:
                #donothing

        with open(SEL_FILE, 'w') as a
            json.dump(selectionData, a)

        with open(REJ_FILE, 'w') as b
            json.dump(rejectionData, b)

    def loadData(self):
        #Read data from file filename into selections and rejections accordingly
        with open(SEL_FILE) as a
            selectionData = json.load(a)

        for key in selectionData.items():
            selections.append(key)

        with open(REJ_FILE) as b
            rejectionData = json.load(b)

        for key in rejectionData.items():
            rejections.append(key)

    def countData(self):
        if len(self.selections) < MIN_DATA_REQUIRED or len(self.rejections) < MIN_DATA_REQUIRED:
            return False
        else:
            return True

    def parseItems(self, data):
        vecs, words = vectorize.parse(data)
        for word in words:
            if word not in self.wordBank:
                self.wordBank.append(word)
        return vecs

    def vectorizeItems(self, data):
        return vectorize.vectorize(data)

    #results is an array-like structure of discovery results
    def getPredictions(self, results):
        vec = parseItems(results)
        vec = vectorizeItem(vec)

        return self.predict(vec)

    #Using the new data, updates the probabilities
    def fitData(self):
        vectorizedData = vectorizeItems(self.selections.extend(self.rejections))

        self.model.fit(vectorizedData.keys(), vectorizedData.values())

def getFeedback(feedback):
    bayes = Bayes()
    bayes.saveData(feedback)

def middleware(responses, mood):

    #Initialize bayes object and load in files
    bayes = Bayes()
    bayes.loadData();

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
        bayes.
        correctList = bayes.naiveBayes(correctList)

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
def get_response(responses):
    activities = []
    type = ""
    title = ""
    bayesDescription = ""
    name = ""
    description = ""

    for result in responses:
        if "Movie" in result["extracted_metadata"]["filename"]:
            title = result["Title"]
            year = result["Year"]
            runtime = result["Runtime"]
            genre = result["Genre"]
            bayesDescription = result["Description"]

            type = "Movie"

            name = "Movie: " + title
            description = year + "; " + runtime + " minutes; " + genre + ";\n" + bayesDescription

        elif "recipe" in result["extracted_metadata"]["filename"]:
            title = result["Title"]
            preptime = str(int(result["preptime"]) + int(result["cooktime"]) + int(result["waittime"]))
            servings = str(result["servings"])
            calories = str(result["calories"])
            ingredients = ', '.join(result["ingredients"])
            bayesDescription = result["instructions"]

            type = "Recipe"

            name = "Recipe: " + recipe
            description = ("Preptime: " + preptime + "; Servings: "
                 + servings + "; Calories: " + calories + ";\nIngredients: "
                 + ingredients + ";\nInstructions: " + instructions)

        elif "joke" in result["extracted_metadata"]["filename"]:
            title = result["title"]
            bayesDescription = result["Description"]

            type = "Joke"

            name = "Joke: " + title
            description = bayesDescription

        elif "Game" in result["extracted_metadata"]["filename"]:
            title = result["Title"]
            genre = result["Genre"]
            bayesDescription = result["Description"]

            type = "Game"

            name = "Game: " + title
            description = "Genre: " + genre + ";\nSummary: " + bayesDescription

        elif "riddle" in result["extracted_metadata"]["filename"]:
            bayesDescription = result["Description"]
            title = result["Title"]

            type = "Riddle"

            name = "Riddle: " + title
            description = "Answer: " + description

        category = 0
        activity = {Type":type, "Title":title, "BayesDescription":bayesDescription,"Name":name, "Description":description, "Category":category}
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
