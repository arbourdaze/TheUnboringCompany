#Middleware for the AI bot
from ibm_watson import DiscoveryV1
import json
import data_processing as dp
import config as cf


version = "'2018-08-01'"
apikey = "gAmMFF4c5rrU5pPXMgIQhXwJ3HeKGgqWYv1WhzX3yJm7"
url = "https://gateway.watsonplatform.net/discovery/api"
env_id = "33c919eb-2486-412f-9936-13c492f0aa6b"
col_id = "b1e74dd2-867b-41c9-8565-adc76d396f93"


def middleware(responses, mood):

    discovery = DiscoveryV1(version={version},iam_apikey={apikey},url={url})

    #Format into keywords


    #for each topic:
    #    if response is not no:
    #        results = makeQuery(keywords)
    #        #save top 3

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
