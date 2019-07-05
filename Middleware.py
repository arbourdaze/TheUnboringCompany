#Middleware for the AI bot
from ibm_watson import DiscoveryV1
import json
import config as cf
import secrets
import sys
import nltk
import gensis
from sklearn.naive_bayes import GaussianNB

MIN_DATA_REQUIRED = 5
FILE = ""

class Bayes:

    selections = []
    rejections = []
    model = GaussianNB()
    file = ""

    def __init__ (self, filename):
        #TODO: Write save and load data functions
        self.file = filename
        self.loadData()
        if self.countData():
            self.updateProbs()

    def saveData(self):
        #Write Data to file filename

    def loadData(self):
        #Read data from file filename into selections and rejections accordingly

    def addSelections(self, items):
        if type(items) is list:
            self.selections.extend(items)
        else:
            self.selections.append(items)

    def addRejections(self, items):
        if type(items) is list:
            self.rejections.extend(items)
        else:
            self.rejections.append(items)

    def countData(self):
        if len(self.selections) < MIN_DATA_REQUIRED or len(self.rejections) < MIN_DATA_REQUIRED:
            return False
        else:
            return True

    def vectorizeItems(self):


    #results is an array-like structure of discovery results
    def naiveBayes(self, results):
        
        vec = self.vectorizeItems(results)

        return self.predict(vec)


    #Using the new data, updates the probabilities
    def updateProbs(self):

        selectVec, rejectVec = self.vectorizeItems()

        self.model.fit([selectVec, rejectVec], [1 for _ in range(len(selectVec)), 0 for _ in range(len(rejectVec))])


def getFeedback(selections, rejections):
    bayes = Bayes(FILE)
    bayes.addSelections(selections)
    bayes.addRejections(rejections)
    bayes.saveData()

def middleware(responses, mood):

    #Initialize bayes object and load in file
    bayes = Bayes(FILE)


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
    
    for result in responses:
        if "Movie" in result["extracted_metadata"]["filename"]:
            title = result["Title"]
            year = result["Year"]
            runtime = result["Runtime"]
            genre = result["Genre"]
            summary = result["Summary"]
            
            name = "Movie: " + title
            description = year + "; " + runtime + " minutes; " + genre + ";\n" + summary

        elif "recipe" in result["extracted_metadata"]["filename"]:
            recipe = result["name"]
            preptime = str(int(result["preptime"]) + int(result["cooktime"]) + int(result["waittime"]))
            servings = str(result["servings"])
            calories = str(result["calories"])
            ingredients = ', '.join(result["ingredients"])
            instructions = result["instructions"]
            
            name = "Recipe: " + recipe
            description = ("Preptime: " + preptime + "; Servings: "
                 + servings + "; Calories: " + calories + ";\nIngredients: "
                 + ingredients + ";\nInstructions: " + instructions)
 
        elif "joke" in result["extracted_metadata"]["filename"]:
            title = result["title"]
            body = result["body"]

            name = "Joke: " + title
            description = body
            
        elif "Game" in result["extracted_metadata"]["filename"]:
            title = result["Title"]
            genre = result["Genre"]
            summary = result["Summary"]

            name = "Game: " + title
            description = "Genre: " + genre + ";\nSummary: " + summary
            
        elif "riddle" in result["extracted_metadata"]["filename"]:
            answer = result["Answer"]
            riddle = result["riddle"]

            name = "Riddle: " + riddle
            description = "Answer: " + answer

            
        activity = {"Name":name, "Description":description}
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
