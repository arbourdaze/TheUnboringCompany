#Middleware for the AI bot
from ibm_watson import DiscoveryV1
import json
import config as cf
import secrets
import sys

class Account:

    username = ""
    password = ""
    selections = []
    rejections = []

    def __init__ (self, username, password):
        self.username = username
        self.password = password

    def updateUsername(self, newName):
        self.username = newName

    def updatePassword(self, newPass):
        self.password = newPass

def createAccount(username, password):
    account = Account(username, password)
    """
    TODO: Write info to file
    Username
    Password
    Selections
    Rejections
    Naive Bayes Metadata
    """


def middleware(responses, mood):

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

            activity = {"Name":name, "Description":description}
            activity = json.dumps(activity)
            activity = json.loads(activity)
            activities.append(activity)
        else:
            recipe = result["name"]
            preptime = int(result["preptime"]) + int(result["cooktime"]) + int(result["waittime"])
            servings = result["servings"]
            calories = result["calories"]
            ingredients = ', '.join(result["ingredients"])
            instructions = result["instructions"]

            name = "Recipe: " + recipe
            description = ("Preptime: " + preptime + "; Servings: "
                 + servings + "; Calories: " + calories + ";\nIngredients: "
                 + ingredients + ";\nInstructions: " + instructions)
            activity = {"Name:":name, "Description":description}
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


with open("InputJSON.json","r") as js:
    print(middleware(js.read().replace('\n',''),"bad"))
