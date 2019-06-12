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

        feedback = makeQuery(keywords, discovery, topic)

        jobj = feedback.result;

        #Filter by time
        #Wont work cuz recipes dont have runtime
        """
        correctList = []
        for element in jobj["results"]:
            if int(element["Runtime"]) < timeLimit:
                correctList.append(element)
        results.append(jobj)
        """
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
                description = ()"Preptime: " + preptime + "; Servings: "
                 + servings + "; Calories: " + calories + ";\nIngredients: "
                  + ingredients + ";\nInstructions: " + instructions)

                activity = {"Name:":name, "Description":description}
                activity = json.dumps(activity)
                activity = json.loads(activity)
                activities.append(activity)

"""
    movies = []
    recipe = []
    matching_results = response.result["matching_results"]
    if cf.NUM_RESULTS < matching_results:
        num = cf.NUM_RESULTS
    else:
        num = matching_results
for i in range(num):
    if 'Title' in response.result["results"][i].keys():
        title = response.result["results"][i]['Title']
        genre = response.result["results"][i]['Genre']
        summary = response.result["results"][i]['Summary']
        runtime = response.result["results"][i]["Runtime"]
        movies.append({'title':title, 'genre':genre, 'summary':summary, 'runtime':runtime})
    elif 'name' in response.result["results"][i].keys():
        name = response.result["results"][i]['name']
        preptime = response.result["results"][i]['preptime']
        waittime = response.result["results"][i]['waittime']
        cooktime = response.result["results"][i]['preptime']
        instructions = response.result["results"][i]['instructions']
        ingredients = response.result["results"][i]['ingredients']
        time = preptime + waittime + cooktime
        recipes.append({'name':name, 'ingredients':ingredients, 'instructions':instructions, 'time':time})
"""
    return activities
