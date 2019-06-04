#Middleware for the AI bot
from ibm_watson import DiscoveryV1


def function(responses, mood):

    discovery = DiscoveryV1(version={version},iam_apikey={apikey},url={url})
    makeQuery(responses)
    


def makeQuery(responses, discovery):

    if not isinstance(responses, dict):
        print("Responses should in format of python dict. {Question : Response} ")
        exit(-1)

    result = None

    #Query Fields{env_id, col_id, filter, query, nl_query, passages,
     #  agg, count, ret_fields, offset, sort, highlight, 
     # pass_fields, pass_chars, deduplicate, dedup_field,
     #  coll_ids, similar, sim_doc_ids, sim_fields, bias,
     #  log_opt_out}
        

    return result

    #0. Parse Q/A into keywords
    #1. Format Q/A into queries + how to format queries
    #2. From responses apply personality results & time restrictions
    #3. Format results into activities string: Activity name + description
