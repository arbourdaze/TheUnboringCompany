#Middleware for the AI bot
from ibm_watson import DiscoveryV1
import json
import config as cf
import secrets
import sys
import random
import operator
import numpy as np

class fearGame: 
    discovery = DiscoveryV1(version=cf.version,iam_apikey=cf.apikey,url=cf.url)

    phobiaList = ["Clowns", "Water", "Ghosts", "Blood", "Needles",
        "Confinement", "Creepy-Crawlies", "Contamination", "Dogs", "Corpses", 
        "Stalkers", "Abandonment", "Authority", "Darkness", "Flying", "Heights", "Storms"]

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
    "Warewolf": np.array([ 0,   0  , 0  , 1 ,  0 ,  0 ,  0 ,  1 ,  1  , 1 ,  1 ,  0  , 0 ,  0  , 0,   0,   0]), 
    "Freak Storm": np.array([0 ,  1 ,  0  , 0  , 0 ,  0  , 0,   0,   0 ,  0 ,  0  , 1  , 0 ,  1 ,  1,   0  , 1]), 
    "Steve": np.array([0,   0 ,  0 ,  0 ,  0 ,  0  , 0,   0 ,  0 ,  0 ,  0  , 0,   0 ,  0  , 0  , 0 ,  0])
     }

    cache = [
        {
            "Title": "Beach",
            "FormalTitle": "The Beach",
            "Description": "A rocky beach.\nA lighthouse towers above.  It seems to stare out at nothing.\nA plane wreck is scattered on the bank.\nYou hear distant thunder.",
            "Phobias":[],
            "Children":["Lighthouse","PlaneWreck","Sky","PottersField","Prison"],
            "Parent":["Dock"],
            "Image":""
        },
        {
            "Title": "Boat",
            "FormalTitle": "The Boat",
            "Description": "You want to sail as far away from this place as you can, but someone has taken the rudder off the boat.  It must be somewhere on land.\nThe dreadful thought sinks in: to get away from this island, you will have to explore it.",
            "Phobias":[],
            "Children":[],
            "Parent":["Dock"],
            "Image":""
        },   
        {
            "Title": "Dock",
            "FormalTitle": "The Dock",
            "Description": "The boards are slippery and rotting.  You could take the boat, jump in the ocean, or you go ashore.  Where to now?",
            "Phobias":[],
            "Children":["Beach","Ocean"],
            "Parent":["Boat"],
            "Image":""
        },
        {
            "Title": "Asylum",
            "FormalTitle": "The Asylum",
            "Description": "It's hard to imagine a place like this would have healed many minds.  Looking at the dubious vials and instruments scattered about, you shudder to think healing might not have been the goal here.\nThe glint of a needle catches your eye.\nA narrow hallway leads to a padded room.",
            "Phobias":[],
            "Children":["PaddedCell","Needle"],
            "Parent":["Woods"],
            "Image":""
        },
        {
            "Title": "PottersField",
            "FormalTitle": "Potter's Field",
            "Description": "A wide field of disturbed earth.  Every few yards, a white stone marks a mass grave. A monument pays respects to those buried here. A sweet but pungent smell rises from an open trench. A lonely sexton wanders the grounds.",
            "Phobias": [],
            "Children": ["Woods", "Orphanage", "Sexton", "OpenTrench", "Monument"],
            "Parent": ["Beach"],
            "Image": ""
        },
        {
            "Title": "Orphanage",
            "FormalTitle": "The Orphanage",
            "Description": "The ruins of an orphanage overlook the Potter's Field.\nIn the middle of an overgrown courtyard is a deep well.\nIn the structure above, you hear a frantic rubbing and creaking.\nA collapsed wall reveals a toy chest with faded paint.  Its lid is slightly ajar.  A porcelain eye peeks through.",
            "Phobias": [],
            "Children": ["Well","ToyChest","Attic"],
            "Parent": ["PottersField", "Woods"],
            "Image": ""
        },
        {
            "Title": "Prison",
            "FormalTitle": "The Prison",
            "Description": "An abandoned prison.  A guard tower looms over the yard.  A long wall marks the place of execution.  A stairway leads down into the dark.",
            "Phobias": [],
            "Children": ["GuardTower","FiringSquad","Solitary","Woods"],
            "Parent": ["Beach"],
            "Image": ""
        },
        {
            "Title": "Woods",
            "FormalTitle": "The Woods",
            "Description": "A wooded area.  The trees flex in the wind like bony fingers.\nA lone wolf stands at a distance, skeletally thin.\nSomething is causing a pile of leaves to stir.\nA suspicious-looking yellow barrel sticks out of the ground.",
            "Phobias":[],
            "Children":["LeafPile","LoneWolf","WasteDrum","Asylum"],
            "Parent":["PottersField","Prison"],
            "Image":""

        }
    ]

    fearVector = {
        "Clowns": 1,
        "Water": 1,
        "Ghosts": 1,
        "Blood": 1,
        "Needles": 1,
        "Confinement": 1,
        "Creepy-Crawlies": 1,
        "Contamination": 1,
        "Dogs": 1,
        "Corpses": 1,
        "Stalkers": 1,
        "Abandonment": 1,
        "Authority": 1,
        "Darkness": 1,
        "Flying": 1,
        "Heights": 1,
        "Storms": 1
    }

    rudderProbability = 0
    delta = 6

    islandMap = {
        "The Beach": ["Dock","Sky","Lighthouse","Plane Wreck","Prison","Potter's Field"],
        "Dock": ["Boat", "Sharks","The Beach"],
        "The Prison": ["Guard Tower", "Solitary Cell", "Firing Squad Wall", "The Beach"],
        "Potter's Field": ["Sexton", "Open Trench", "The Woods", "The Orphanage", "The Beach"],
        "The Orphanage": ["Toy Shelf", "Well", "Wailing Attic", "The Asylum", "Potter's Field"],
        "The Asylum": ["Needles", "Padded Cell", "The Orphanage"],
        "The Woods": ["Lone Wolf", "Deer Carcass", "Potter's Field"]
    }

    

    def __init__(self):
        return


    class Monster:

        monsterLocations = {
        "Sexton": "Potter's Field",
        "Ghost Tornado": "Asylum",
        "Critter Infestation": "Woods",
        "Radiation Spike": "Radioactive Waste Drum",
        "Chasm": "Open Trench",
        "Zombie Apocalypse": "Potter's Field",
        "Mad Doctor": "Asylum",
        "IT Clown": "Prison",
        "Depression Fog": "Dock",
        "Warewolf": "Woods",
        "Freak Storm": "Beach",
        "Steve": "Sky"
        }

        location = ""
        playerLocation = ""
        goalLocation = ""
        title = ""
        formalTitle = ""
        description = ""
        image = ""
        phobias = ""
        toMoveTo = []


        def __init__(self, name):
            #result = makeQuery(name, playerLocation, discovery)
            #result = result.result["results"][0]

            self.title = name
            self.location = self.monsterLocations[name]
            #self.image = result["Image"]
            #self.formalTitle = result["FormalTitle"]
            #self.description = result["Description"]
            #self.phobias = result["Phobias"]
            #self.playerLocation = playerLocation
            #self.goalLocation = playerLocation


    def chooseMonster(self, playerLocation):
        differenceMatrix = np.array([list(self.fearVector.values())])

        for i in range(len(self.monsterList) - 1):
            differenceMatrix = np.concatenate((differenceMatrix, np.array([list(self.fearVector.values())])), axis=0)

        row = 0
        for arr in list(self.monsterList.values()):
            differenceMatrix[row,:] = np.subtract(arr, differenceMatrix[row,:])
            row += 1

        norms = np.linalg.norm(differenceMatrix, axis=1)

        indices = np.argmin(norms)

        index = None
        if not np.isscalar(indices):
            index = indices[0]
        else:
            index = indices

        monsterName = list(self.monsterList.keys())[index]

        return self.Monster(monsterName)


    def foundRudder(self):
        num = random.randint(1,100)

        if num <= self.rudderProbability:
            return True
        else:
            self.rudderProbability += self.delta
            return False

    def getCard(self, title):
        nextCard = None
        checkRudder = True

        for card in self.cache:
            if card["Title"] == title:
                checkRudder = False
                nextCard = card
                break


        if nextCard is None:
            response = self.makeQuery(title, self.discovery)
            results = response.result["results"]
            for result in results:
                if result["Title"] == title:
                    nextCard = result
                    break

        return nextCard, checkRudder

        

    def getMove(self, title, monster):

        nextCard = None
        nextCard = self.getCard(title)
        if nextCard is None:
            return False, False

        return False, False

        

    def getNext(self, title, phobias):

        checkRudder = True
        for phobia in phobias:
            self.fearVector[phobia] = 0

        nextCard = None
        
        nextCard, checkRudder = self.getCard(title)

        if nextCard is None:
            return False, False

        gotRudder = False

        if checkRudder:
            gotRudder = self.foundRudder()

        if gotRudder:
            monster = self.chooseMonster(title)

            return nextCard, monster

        return nextCard, False



    def makeQuery(self, title, discovery):
        result = None

        filterParam = "Title:\"" + title + "\""

        result = self.discovery.query(environment_id = cf.env_id, collection_id = cf.col_id, filter = filterParam,
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


