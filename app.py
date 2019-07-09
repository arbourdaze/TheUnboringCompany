from flask import Flask, render_template, request
import Middleware as mw
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('layout.html')

@app.route('/search', methods=['GET', 'POST'])
def search():
    content = request.get_json()
    responses = mw.middleware(json.dumps(content), None)
    return responses
    
@app.route('/get-feedback', methods=['GET', 'POST'])
def getFeedback():
    content = request.get_json()
    responses = mw.getFeedback(json.dumps(content), None)
    return responses

@app.route('/surprise-me', methods=['GET', 'POST'])
def surpriseMe():
    content = request.get_json()
    responses = mw.surpriseMe();
    return responses
    
if __name__ == '__main__':
    app.run(debug = True)