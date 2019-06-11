#Middleware for the AI bot
from ibm_watson import DiscoveryV1
import json
<<<<<<< HEAD
=======
import data_processing as dp
import config as cf
>>>>>>> master


version = "'2018-08-01'"
apikey = ""
url = "https://gateway.watsonplatform.net/discovery/api"
env_id = ""
col_id = ""


def middleware(responses, mood):

    discovery = DiscoveryV1(version={version},iam_apikey={apikey},url={url})

    #Load json object into python object
    data = json.loads(responses)

    
    results = [] #Object containing the json objects of all results returned
    #Parse into keywords and make query
    for topic in data["Topics"]:
        keywords = []
        if data[topic] is "No":
            continue

<<<<<<< HEAD
        for catagory in data[topic + "Good"]: #Temporary, based on what rebecca decides to do
            keywords.append(catagory)

        result = makeQuery(keywords)
        results.extend(result)
=======
    #for each topic:
    #    if response is not no:
    #        results = makeQuery(keywords)
    #        #save top 3
>>>>>>> master

    #Convert json objects into something not terrible for reading


def makeQuery(keywords, discovery):
    result = None


    """
    filter = excludes docs that don't mention filter
    query = the query
    natural_language_query = the query but using natural language processing
    passages = T/F returns most relevant passages from results
    aggregation = combines query search with filters
    count = # of results to return
    """


    result = discovery.query(environment_id = env_id, collection_id = col_id, filter = None,
        query = keywords, count = cf.NUM_RESULTS)
        

    return result


# get bored minutes
def get_minutes(data):
    hours, minutes = dp.get_time(data)
    result = hours * 60 + minutes

    return result


# get movies infos from watson response
def get_movies(response):
    movies = []
    matching_results = response.result["matching_results"]
    if cf.NUM_RESULTS < matching_results:
        num = cf.NUM_RESULTS
    else:
        num = matching_results
    for i in range(num):
        title = response.result["results"][i]['Title']
        genre = response.result["results"][i]['Genre']
        summary = response.result["results"][i]['Summary']
        runtime = response.result["results"][i]["Runtime"]
        movies.append({'title':title, 'genre':genre, 'summary':summary, 'runtime':runtime})
       
    return movies


if __name__=="__main__":
    data = dp.load_file(cf.DATA_PATH)
    print(get_minutes(data))
