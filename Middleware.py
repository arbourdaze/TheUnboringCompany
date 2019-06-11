#Middleware for the AI bot
from ibm_watson import DiscoveryV1
import json
import data_processing as dp
import config as cf
import secrets as sec


def middleware(responses, mood):

    discovery = DiscoveryV1(version=sec.version,iam_apikey=sec.apikey,url=sec.url)

    #Load json object into python object
    data = json.loads(responses)

    timeLimit = get_minutes(data)

    results = [] #Object containing the json objects of all results returned
    #Parse into keywords and make query
    for topic in data["Topics"]:
        keywords = []
        if data[topic] is "No":
            continue

        for catagory in data["Liked" + topic]: #Temporary, based on what rebecca decides to do
            keywords.append(catagory)

        result = makeQuery(keywords, discovery, topic)

        jobj = result.json()

        #Filter by time
        for element in jobj["results"]:
            if int(element["Runtime"]) > timeLimit:
                jobj["results"].remove(element)
        results.append(jobj)

    #Convert json objects into something not terrible for reading
    return get_response(results)

def makeQuery(keywords, discovery, topic):
    result = None

    filterParam = "extracted_metadata.filename:\"" + topic + "\""

"""
    filter = excludes docs that don't mention filter
    query = the query
    natural_language_query = the query but using natural language processing
    passages = T/F returns most relevant passages from results
    aggregation = combines query search with filters
    count = # of results to return
"""


    result = discovery.query(environment_id = sec.env_id, collection_id = sec.col_id, filter = filterParam,
        query = ' '.join(keywords), count = cf.NUM_RESULTS)


    return result


# get bored minutes
def get_minutes(data):

    time = data["Time"]
    hours = time["hours"]
    minutes = time["minutes"]

    totalTime = (int(hours) * 60) + int(mintues)

    return totalTime


# get movies infos from watson response
#[{"Name":Name, "Description":Description}, {"Name":Name, "Description":Description}, ...]
def get_response(responses):

    activities = []
    for response in responses:
        for result in response["results"]:
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
                preptime = int(result["preptime"]) + int(result["cooktime"])
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

    return activities
