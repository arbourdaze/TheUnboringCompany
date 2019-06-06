import json
import config

def load_file(path):
    data = []
    with open(path, "r") as infile:
        data = json.loads(infile.read())
    return data
   
def get_time(data):
    hours = data['time']['hours']
    minutes = data['time']['minutes']
    return hours, minutes

def get_mood(data):
    o = data['mood']['openness']
    c = data['mood']['conscientiousness']
    e = data['mood']['extroversion']
    a = data['mood']['agreeableness']
    n = data['mood']['neuroticism']
    return o, c, e, a, n

def parse_response():
    data = load_file(config.DATA_PATH)
    hours, minutes = get_time(data)
    o, c, e, a, n = get_mood(data)
    return hours, minutes, o, c, e, a, n    
    
if __name__=="__main__":
    data = load_file(config.DATA_PATH)
    print(data)
    time = data['time']['hours']
    mood = data['mood']
    print(get_time(data))
    print(get_mood(data))
