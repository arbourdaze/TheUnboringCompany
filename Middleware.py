#Middleware for the AI bot
from ibm_watson import DiscoveryV1
import json
import config as cf
import secrets
import sys
import random
import operator
import numpy as np

phobiaList = ["Clowns", "Water", "Ghosts", "Blood", "Needles",
    "Confinement", "CreepyCrawlies", "Contamination", "Dogs", "Corpses", 
    "Stalkers", "Abandonment", "Authority", "Darkness", "Flying", "Height", "Storms"]

monsterList = {"Sexton": np.array([0,   0,   0,   0,   0,   1,   0,   0,   0,   1,   1,   0,   1,   1,   0,   0,   0]),
 "Dogs": np.array([0  , 0 ,  0,   1,   0,   0,   0,   0 ,  1,   1,   0,   0,   0,   1,   0,   0,   0,]),
 "Ghost Tornado": np.array([0 ,  1 ,  1,  0  , 0 ,  0,   0  , 0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  1 ,  1 ,  1]), 
 "Critter Infestation": np.array([0,   0 ,  0,   0  , 0 ,  0,   1 ,  1 ,  0,   0,   0,   0,   0,   0,   0 ,  0 ,  0]), 
 "Radiation Spike": np.array([0,   0 ,  0  , 1 ,  0 ,  1 ,  0 ,  1 ,  0 ,  1   ,0 ,  0,   0 ,  1 ,  0 ,  0  , 0]), 
 "Chasm": np.array([0   ,1  , 0 ,  0  , 0  , 0 ,  0  , 0  , 0  , 0  , 0  , 0 ,  0 ,  1  , 0 ,  1  , 0]), 
 "Zombie Apocalypse": np.array([0 ,  0 ,  1  , 1,   0  , 0  , 0 ,  0,   0,   1  , 1  , 0 ,  0  , 1 ,  0  , 0 ,  0]),
 "Mad Doctor": np.array([0  , 0 ,  0 ,  1,   1,   0  , 0 ,  1 ,  0 ,  0 ,  1 ,  0  , 1 ,  0 ,  0 ,  0 ,  0]), 
 "IT Clown": np.array([1 ,  0  , 0 ,  1,   0 ,  0 ,  0 ,  0 ,  0,   1  , 1 ,  0  , 0 ,  0 ,  0 ,  0 ,  0]), 
 "Depression Fog": np.array([0 ,  1  , 1 ,  0,   0 ,  0   ,0  , 0,   0 ,  0 ,  0 ,  1 ,  0  , 1 ,  0 ,  0 ,  1]), 
 "Werewolf": np.array([ 0,   0  , 0  , 1 ,  0 ,  0 ,  0 ,  1 ,  1  , 1 ,  1 ,  0  , 0 ,  0  , 0,   0,   0]), 
 "Freak Storm": np.array([0 ,  1 ,  0  , 0  , 0 ,  0  , 0,   0,   0 ,  0 ,  0  , 1  , 0 ,  1 ,  1,   0  , 1]), 
 "Steve": np.array([0,   0 ,  0 ,  0 ,  0 ,  0  , 0,   0 ,  0 ,  0 ,  0  , 0,   0 ,  0  , 0  , 0 ,  0])
 }

cache = []

rudderless = []

fearVector = {
    "Clowns": 1,
    "Water": 1,
    "Ghosts": 1,
    "Blood": 1,
    "Needles": 1,
    "Confinement": 1,
    "CreepyCrawlies": 1,
    "Contamination": 1,
    "Dogs": 1,
    "Corpses": 1,
    "Stalkers": 1,
    "Abandonment": 1,
    "Authority": 1,
    "Darkness": 1,
    "Flying": 1,
    "Height": 1,
    "Storms": 1
}

rudderProbability = 0
delta = 3

def chooseMonster():
    differenceMatrix = np.array(fearVector.values())

    row = 0
    for arr in monsterList.values():
        differenceMatrix[row] = np.subtract(arr, differenceMatrix[row])
        row += 1
        np.concatinate((differenceMatrix, np.array(fearVector.values())), axis=0)

    np.delete(differenceMatrix, row, axis=0)

    norms = np.linalg.norm(differenceMatrix, axis=1)

    indicies = np.argmin(norms)

    index = None
    if len(indicies) > 1:
        index = indicies[0]
    else:
        index = indicies

    return monsterList.keys()[index]


def foundRudder():
    num = random.randInt(1,100)

    if num <= rudderProbability:
        return True
    else:
        rudderProbability += delta
        return False

def getNext(title, phobias):

    for phobia in phobias:
        fearVector[phobia] = 0

    noRudder = True

    nextCard = None
    for card in cache:
        if card["Title"] == title:
            nextCard = card
            break

    discovery = DiscoveryV1(version=cf.version,iam_apikey=cf.apikey,url=cf.url)

    if nextCard is None:
        noRudder = False
        response = makeQuery(title, discovery)
        results = response.result["results"]
        for result in results:
            if result["Title"] == title:
                nextCard = result
                break

        if nextCard is None:
            return False, False

    gotRudder = False

    if not noRudder:
        gotRudder = foundRudder()

    if gotRudder:
        monster = chooseMonster()

        return nextCard, monster

    return nextCard, False



def makeQuery(title, discovery):
    result = None

    filterParam = "extracted_metadata.filename:\"" + title + "\""

    result = discovery.query(environment_id = cf.env_id, collection_id = cf.col_id, filter = filterParam,
        query = title)

    return result

"""
    filter = excludes docs that don't mention filter
    query = the query
    natural_language_query = the query but using natural language processing
    passages = T/F returns most relevant passages from results
    aggregation = combines query search with filters
    count = # of results to return
"""


