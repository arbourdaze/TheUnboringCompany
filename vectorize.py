from nltk import sent_tokenize
from nltk import word_tokenize
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
import string

"""
Activity JSON object
{
    Type: ""
    Title: ""
    BayesDescription: ""
    Name: ""
    Description: ""
    Category: {0 --uncategorized, 1 -- rejected, 2 -- selected}
}
"""

def parse(data, types, features):
	porter = PorterStemmer()
	stop_words = stopwords.words('english')

	processedData = []
	vectorizedData = dict()

	for item in data:
		typ = item["Type"]
		title = item["Title"]
		description = item["BayesDescription"]

		if typ not in types.keys():
			types[typ] = len(types)

		#Split By Sentences
		sentences = sent_tokenize(description)
		sent = sent_tokenize(title)

		descWC = dict()
		titWC = dict()

		#For Title
		for sen in sent:
			words = word_tokenize(sen)

			#Filter out stop words; remove punctuation & numbers & reduce to lower case
			words = [word.lower() for word in words if word.isalpha()]

			#Remove extra punctuation
			table = str.maketrans('', '', string.punctuation)
			words = [word.translate(table) for word in words]

			#Filer out stopwords
			words = [word for word in words if not word in stop_words]

			#Reduce to stem words
			words = [porter.stem(word) for word in words]

			for word in words:
				if word not in features:
					features.append(word)
				if word in titWC.keys():
					titWC[word] += 1
				else:
					titWC[word] = 1

		#For Description
		for sentence in sentences:
			words = word_tokenize(sentence)

			#Filter out stop words; remove punctuation & numbers & reduce to lower case
			words = [word.lower() for word in words if word.isalpha()]

			#Remove extra punctuation
			table = str.maketrans('', '', string.punctuation)
			words = [word.translate(table) for word in words]

			#Filer out stopwords
			words = [word for word in words if not word in stop_words]

			#Reduce to stem words
			words = [porter.stem(word) for word in words]

			for word in words:
				if word not in features:
					features.append(word)
				if word in descWC.keys():
					descWC[word] += 1
				else:
					descWC[word] = 1

		processedData.append(
			{
				"Type": types[item["Type"]],
				"Title": titWC,
				"BayesDescription": descWC,
				"Name": item["Name"],
				"Description": item["Discription"],
				"Category": item["Category"]
			}
		)

	return processedData

def vectorize(data, words):
	for item in data:
		vector = []
		vector.append(item["Type"])
		titleVec = []
		descVec = []
		for word in words:
			if word in item["Title"].keys():
				titleVec.append(item["Title"][word])
			else:
				titleVec.append(0)
			if word in item["BayesDescription"].keys():
				descVec.append(item["Title"][word])
			else:
				descVec.append(0)
		vector.append(titleVec)
		vector.append(descVec)
		vectorizedData[vector] = item["Category"]

	return vectorizedData
