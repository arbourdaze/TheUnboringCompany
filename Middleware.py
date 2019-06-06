#Middleware for the AI bot
from ibm_watson import DiscoveryV1


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



    #Query Fields{env_id, col_id, filter, query, nl_query, passages,
     #  agg, count, ret_fields, offset, sort, highlight, 
     # pass_fields, pass_chars, deduplicate, dedup_field,
     #  coll_ids, similar, sim_doc_ids, sim_fields, bias,
     #  log_opt_out}
        

    return result
