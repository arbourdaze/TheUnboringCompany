from flask import Flask, render_template, request
import Middleware as mw

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('layout.html')

@app.route('/search', methods=['GET', 'POST'])
def search():
    content = request.get_json()
    responses = mw.middleware(content, None)
    return responses
    #return '{"Data" : [ { "Name": "Hello", "Description": "World" } ]}'
    
if __name__ == '__main__':
    app.run(debug = True)