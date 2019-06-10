import json
import config


# load json file
def load_file(path):
    data = []
    with open(path, "r") as infile:
        data = json.loads(infile.read())
    return data


# get time from Q/A json   
def get_time(data):
    hours = data['time']['hours']
    minutes = data['time']['minutes']
    return hours, minutes


# get mood from Q/A json
def get_mood(data):
    o = data['mood']['openness']
    c = data['mood']['conscientiousness']
    e = data['mood']['extroversion']
    a = data['mood']['agreeableness']
    n = data['mood']['neuroticism']
    return o, c, e, a, n


# test    
if __name__=="__main__":
    data = load_file(config.DATA_PATH)
    print(get_time(data))
    print(get_mood(data))
