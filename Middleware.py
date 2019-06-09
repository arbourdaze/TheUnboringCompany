#Middleware for the AI bot
from ibm_watson import DiscoveryV1
import json

version = ""
apikey = ""
url = ""
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

        for catagory in data[topic + "Good"]: #Temporary, based on what rebecca decides to do
            keywords.append(catagory)

        result = makeQuery(keywords)
        results.extend(result)

    #Convert json objects into something not terrible for reading


def makeQuery(keywords, discovery):
    result = None
    num_results = 3

    """
    filter = excludes docs that don't mention filter
    query = the query
    natural_language_query = the query but using natural language processing
    passages = T/F returns most relevant passages from results
    aggregation = combines query search with filters
    count = # of results to return
    """


    result = discovery.query(environment_id = env_id, collection_id = col_id, filter = None,
        query = keywords, count = num_results)
        

    return result
