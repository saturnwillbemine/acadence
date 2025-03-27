#
# This is the API I'll be using to interact with the database using mysql-connector and Flask
#

from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector as mysql
import json
import bcrypt

app = Flask(__name__)
CORS(app, origins='http://localhost:3000') #allows for cross-origin resource sharing

def getCursor():
    db = mysql.connect(
        host="10.101.128.56",
        port="6033",
        user="website",
        password="web123",
        database="Acadence")

    cursor = db.cursor()
    return db, cursor


def closeConnection(db, cursor):
    db.commit()
    cursor.close()
    db.close()

@app.route("/validate", methods=['POST', 'OPTIONS']) #takes username and password and validates login
def validate():
    if request.method == "OPTIONS":
        response = jsonify({})
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response
    data = request.get_json()
    return jsonify(validateLogin(data))

def validateLogin(data):  # validate password in users table based on given username and password info
    username = data.get("username")
    password = data.get("pass")

    db, cursor = getCursor()
    
    cursor.execute("SELECT pass, username, professorName, professorID FROM Professor WHERE username = %s;", (username,))
    result = cursor.fetchone()
    
    returnData = {}
    
    try:
        if bcrypt.checkpw(password.encode('utf-8'), result[0].encode('utf-8')):
            returnData["success"] = True
            returnData["username"] = result[1]
            returnData["professorName"] = result[2]
            returnData["professorID"] = result[3]

        else:
            returnData["success"] = False
            
    except:
        returnData["success"] = False
        
    finally:
        closeConnection(db, cursor)
        return returnData


app.run(host="0.0.0.0", port=5000)
