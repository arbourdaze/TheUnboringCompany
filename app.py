from flask import Flask, render_template, request, jsonify
from Middleware import fearGame
import json

app = Flask(__name__)

fg = fearGame()

@app.route('/')
def index():
    return render_template('layout.html')

@app.route('/reset', methods=['GET', 'POST'])
def reset():
    content = request.get_json()
    fg.reset()
    return jsonify([])

@app.route('/get-card', methods=['GET', 'POST'])
def get_card():
    content = request.get_json()
    with open('Cards/' + content['Title'] + '.json') as f:
        data = json.load(f)
    return jsonify(data);
    
@app.route('/get-next', methods=['GET', 'POST'])
def get_next():
    content = request.get_json()
    card, monster = fg.getNext(content['Title'], content['NonPhobias'])
    response = {}
    if monster:
        response['FoundRudder'] = True
        response['Monster'] = monster.title
    else:
        response['FoundRudder'] = False
    response['Card'] = card
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug = True)