#Custom Bayes
from sklearn.naive_bayes import GaussianNB
from sklearn.naive_bayes import MultinomialNB

class CompositeBayes:

	typeBayes = None
	titleBayes = None
	descriptionBayes = None
	weights = []
	gradient = 0

	def __init__(self):
		self.typeBayes = GaussianNB()
		self.titleBayes = MultinomialNB()
		self.descriptionBayes = MultinomialNB()
		self.weights = [.33,.33,.33]
		self.gradient = .03


	def compositeFit(self, typeData, titleData, descriptionData, categories):
		self.typeBayes.fit(typeData, categories)
		self.titleBayes.fit(titleData, categories)
		self.descriptionBayes.fit(descriptionData, categories)


	#Returns Predictions
	def compositePredict(self, typeData, titleData, descriptionData):
		typePreds = self.typeBayes.predict(typeData)
		titlePreds = self.titleBayes.predict(titleData)
		descriptionPreds = self.descriptionBayes.predict(descriptionData)

		#Yes, this is very long
		compositePreds = [round(weights[0]*tyPred + weights[1]*tiPred + weights[2]*dePred) for tyPred,tiPred,dePred in zip(typePreds,titlePreds,descriptionPreds)]

		return compositePreds

