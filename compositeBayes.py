#Custom Bayes
from sklearn.naive_bayes import GaussianNB
from sklearn.naive_bayes import MultinomialNB

class CompositeBayes:

	typeBayes = None
	titleBayes = None
	descriptionBayes = None
	weights = []
	gradient = 0
	titleDataLength = 0
	descriptionDataLength = 0

	def __init__(self):
		self.typeBayes = GaussianNB()
		self.titleBayes = MultinomialNB()
		self.descriptionBayes = MultinomialNB()
		self.weights = [.33,.33,.33]
		self.gradient = .03


	def enforceLength(dataList, requiredLength = 0):
		length = requiredLength
		if requiredLength == 0:
			length = len(dataList[0])
		for item in dataList:
			if len(item) is not length:
				return False
		return True

	def compositeFit(self, typeData, titleData, descriptionData, categories):

		if not enforceLength(titleData):
			print("Error: TitleData length is not consistent")
		else:
			self.titleDataLength = len(titleData[0])
		if not enforceLength(descriptionData):
			print("Error: DescriptionData length is not consistent")
		else:
			self.descriptionDataLength = len(descriptionData[0])

		self.typeBayes.fit(typeData, categories)
		self.titleBayes.fit(titleData, categories)
		self.descriptionBayes.fit(descriptionData, categories)


	#Returns Predictions
	def compositePredict(self, typeData, titleData, descriptionData):

		if not enforceLength(titleData, self.titleDataLength):
			print("Error: Test TitleData length is not consistent")
		if not enforceLength(descriptionData, self.descriptionDataLength):
			print("Error: Test DescriptionData length is not consistent")

		typePreds = self.typeBayes.predict(typeData)
		titlePreds = self.titleBayes.predict(titleData)
		descriptionPreds = self.descriptionBayes.predict(descriptionData)

		#Yes, this is very long
		compositePreds = [round(weights[0]*tyPred + weights[1]*tiPred + weights[2]*dePred) for tyPred,tiPred,dePred in zip(typePreds,titlePreds,descriptionPreds)]

		return compositePreds

