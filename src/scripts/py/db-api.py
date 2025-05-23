#
# This is the API I'll be using to interact with the database using mysql-connector and Flask
#

from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector as mysql
from dotenv import load_dotenv
import os
import bcrypt
from datetime import datetime

load_dotenv()

SITE_URL=os.getenv('SITE_URL')
DB_USER=os.getenv('DB_USER')
DB_PASS=os.getenv('DB_PASS')
DB_HOST=os.getenv('DB_HOST')

app = Flask(__name__)
CORS(app, origins=SITE_URL) #allows for cross-origin resource sharing

###################### database connection

def getCursor():
    db = mysql.connect(
        host=DB_HOST,
        port="6033",
        user=DB_USER,
        password=DB_PASS,
        database="Acadence")

    cursor = db.cursor()
    return db, cursor


def closeConnection(db, cursor):
    db.commit()
    cursor.close()
    db.close()

###################### validate login

@app.route("/validate", methods=['POST', 'OPTIONS']) #takes username and password and validates login
def validate():
    if request.method == "OPTIONS":
        response = jsonify({})
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response
    data = request.get_json()
    return jsonify(validateLogin(data))

def validateLogin(data):  # validate password in users table based on given username and password info

    db, cursor = getCursor()

    username = data.get("username")
    password = data.get("pass")
    
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
    
###################### get classes

@app.route("/getProfClasses", methods=['POST', 'OPTIONS'])
def getProfClasses():
    if request.method == 'OPTIONS':
        response = jsonify()
        response.headers.add('Allow-Control-Allow-Headers', 'Content-Type')
        return response
    data = request.get_json()
    return jsonify(getClasses(data))


def getClasses(data):
    db, cursor = getCursor()

    profID = data.get('professorID')

    cursor.execute("SELECT * FROM Classes WHERE professorID = %s;", (profID,))
    result = cursor.fetchmany(size=8) ## maximum of 8 classes a professor could have

    returnData = []

    for i in range(len(result)):
        returnData.append({
            'classID': result[i][0],
            'professorID': result[i][1],
            'className': result[i][2],
            'classDept': result[i][3],
            'classDesc': result[i][4]
        })

    return returnData

###################### get class rosters and attendances

@app.route("/getRoster", methods=['POST', 'OPTIONS'])
def getRoster():
    if request.method == 'OPTIONS':
        response = jsonify()
        response.headers.add('Allow-Control-Allow-Headers', 'Content-Type')
        return response
    data = request.get_json()
    return jsonify(getClassRoster(data))


def getClassRoster(data):
    db, cursor = getCursor()

    try:
        classID = data.get("classID")
        currentDate = datetime.now().strftime('%Y-%m-%d')

        # grab list of students
        cursor.execute("SELECT studentID, studentName FROM Student WHERE classID = %s", (classID,))
        students = cursor.fetchall()

        # grab attendance for today
        cursor.execute("SELECT studentID, studentStatus FROM Attendance WHERE classID = %s AND recordDate = %s", (classID, currentDate))
        attendance = cursor.fetchall()

        attendanceDict = {entry[0]: entry[1] for entry in attendance}

        returnData = []

        for student in students:
            studentID, studentName = student
            status = attendanceDict.get(studentID, 'Present') #return present if no entry in dict
            returnData.append({
                'studentID': studentID,
                'studentName': studentName,
                'status': status
            })

        return returnData

    finally:
        closeConnection(db, cursor)


###################### create Student

@app.route("/createStudent", methods=['POST', 'OPTIONS'])
def makeStudentRequest():
    if request.method == 'OPTIONS':
        response = jsonify()
        response.headers.add('Allow-Control-Allow-Headers', 'Content-Type')
        return response
    data = request.get_json()
    return jsonify(createStudent(data))

def createStudent(data):
    db, cursor = getCursor()

    try:
        classID = data.get("classID")
        studentName = data.get("studentName")

        # add student to class from classID
        cursor.execute("INSERT INTO Student (classID, studentName) VALUES (%s, %s)", (classID, studentName))

        returnData={}
        returnData['sucesss'] = True
        return returnData
    except:
        returnData['sucesss'] = False
        return returnData

    finally:
        closeConnection(db, cursor)

###################### create Class

@app.route("/createClass", methods=['POST', 'OPTIONS'])
def makeClassRequest():
    if request.method == 'OPTIONS':
        response = jsonify()
        response.headers.add('Allow-Control-Allow-Headers', 'Content-Type')
        return response
    data = request.get_json()
    return jsonify(createClass(data))

def createClass(data):
    db, cursor = getCursor()

    try:
        professorID = data.get("professorID")
        className = data.get("className")
        deptName = data.get("deptName")
        classDesc = data.get("classDesc")

        # add class from data
        cursor.execute("INSERT INTO Classes (professorID, className, deptName, classDesc) VALUES (%s, %s, %s, %s)", (professorID, className, deptName, classDesc))

        returnData={}
        returnData['sucesss'] = True
        print(returnData)
        return returnData
    
    except:
        returnData['sucesss'] = False
        return returnData

    finally:
        closeConnection(db, cursor)

######################

@app.route("/getAllStudents", methods=['POST', 'OPTIONS'])
def getAllStudentsRequest():
    if request.method == 'OPTIONS':
        response = jsonify()
        response.headers.add('Allow-Control-Allow-Headers', 'Content-Type')
        return response
    data = request.get_json()
    return jsonify(getAllStudents(data))

def getAllStudents(data):
    db, cursor = getCursor()

    try:
        professorID = data.get("professorID")

        # grab list of students from every class
        cursor.execute("SELECT studentID, studentName, className From Student NATURAL JOIN Classes WHERE professorID = %s", (professorID,))
        result = cursor.fetchall()

        returnData = []

        for i in range(len(result)):
            returnData.append({
                'studentID': result[i][0],
                'studentName': result[i][1],
                'className': result[i][2]
            })
        return returnData

    finally:
        closeConnection(db, cursor)

######################

@app.route("/getStudentAttendance", methods=['POST', 'OPTIONS'])
def getStudentAttendanceRequest():
    if request.method == 'OPTIONS':
        response = jsonify()
        response.headers.add('Allow-Control-Allow-Headers', 'Content-Type')
        return response
    data = request.get_json()
    return jsonify(getStudentAttendance(data))

def getStudentAttendance(data):
    db, cursor = getCursor()

    try:
        studentName = data.get("studentName")

        # grab list of every students absences from every class
        cursor.execute("SELECT Attendance.studentID, Student.studentName, recordDate, studentStatus From Attendance LEFT JOIN Student on Student.studentID = Attendance.studentID WHERE Student.studentName = %s", (studentName,))
        result = cursor.fetchall()

        returnData = []

        for i in range(len(result)):
            returnData.append({
                'studentID': result[i][0],
                'studentName': result[i][1],
                'recordDate': result[i][2],
                'studentStatus': result[i][3]

            })
    
        return returnData

    finally:
        closeConnection(db, cursor)

######################

@app.route("/submitAttendance", methods=['POST', 'OPTIONS'])
def submitAttendanceRequest():
    if request.method == 'OPTIONS':
        response = jsonify()
        response.headers.add('Allow-Control-Allow-Headers', 'Content-Type')
        return response
    data = request.get_json()
    return jsonify(submitAttendance(data))

def submitAttendance(data):
    db, cursor = getCursor()
    try:
        current_time = datetime.now().strftime('%Y-%m-%d')
        classID = data.get('classID')
        professorID = data.get('professorID')
        lists = data.get('lists', {})
        
        for status, student_ids in lists.items():
            for student_id in student_ids:
                cursor.execute(
                    """INSERT INTO Attendance 
                       (studentID, studentStatus, recordDate, classID, recorded_by)
                       VALUES (%s, %s, %s, %s, %s)""",
                    (student_id, status.lower(), current_time, classID, professorID)
                )
        return {'success': True}

    finally:
        closeConnection(db, cursor)

######################

@app.route("/getAttendanceStats", methods=['POST', 'OPTIONS'])
def getAttendanceStatsRequest():
    if request.method == 'OPTIONS':
        response = jsonify()
        response.headers.add('Allow-Control-Allow-Headers', 'Content-Type')
        return response
    data = request.get_json()
    return jsonify(getAttendanceStats(data))

def getAttendanceStats(data):
    db, cursor = getCursor()
    try:
        fromDate = data.get('fromDate')
        toDate = data.get('toDate')
        classID = data.get('classID')

        cursor.execute("SELECT COUNT(*) FROM Attendance WHERE recordDate BETWEEN %s and %s and classID = %s", (fromDate, toDate, classID))
        result = cursor.fetchone()

        return result[0]
    finally:
        closeConnection(db, cursor)

app.run(host="0.0.0.0", port=5000)