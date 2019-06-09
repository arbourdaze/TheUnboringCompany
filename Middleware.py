#Middleware for the AI bot
from ibm_watson import DiscoveryV1

version = ""
apikey = ""
url = ""
env_id = ""
col_id = ""


def middleware(responses, mood):

    discovery = DiscoveryV1(version={version},iam_apikey={apikey},url={url})

    #Format into keywords


    for each topic:
        if response is not no:
            results = makeQuery(keywords)
            #save top 3

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
