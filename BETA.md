# Beta Release
---
### Requirements not Met
Looking back on my proposal, I was surprisingly able to get almost all of the features that I had originally planned. There was one feature that I wasn't able to get as in depth, I was able to get a basic version of it, but not the level of detail that I wanted from the feature. 

In my proposal, I had listed about four of the major features of this application. The user would be able to login, they would be able to see a dashboard for the them to see all of their classes, they would also have the ability to be able to create their own classes from the dashboard, on each class page they would be able to mark the attendance of students in the user's classes, and finally they would have the ability to generate attendance reports for specific students. The last feature is the one that I wasn't able to finish. I didn't give myself enough time to get as in depth with the reports like generating pdf copies that the user could download from the app. 

---

### Organization

This is the file structure of my application. Next.js has a file routing system so I was able to make each folder as a route and have a different page for each of the routes. The *(loggedIn)* folder is just a folder telling Next.js that all of the routes in this folder are in one group and they are all to use the same *layout.tsx* file which renders on every page, and in my case it just holds things like my AppShell component which is the overlay for my application with the navigation and the notification system for me to use throughout the pages.
```
acadence/
├── src/
│   ├── app
│   ├── (loggedIn)/
│   │   ├── class/
│   │   │   └── page.tsx
│   │   ├── createclass/
│   │   │   └── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   ├── students/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── components/
│   │   ├── module-css/
│   │   │   └── various-modules.css
│   │   └── various-components.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── scripts/
│   ├── py/
│   │   └── various-scripts.py
│   └── various-scripts.ts
├── .env
├── README.md
├── ALPHA.md
└── etc...

```
---
### Key Method/Data Structure
A key method of my program that gives it the main functionality. It is my Student Roster/Attendance taker component. 

#### function *getClassRoster()* inside of **db_api.py**

This is the function that the API performs when called to query the database and grab the student roster for a certain class and that class' attendance for the day. For attendance, we grab all of the absent/late students and put them in a dictionary. We then go through that list of students and if the student isn't in the dictionary with an absence we mark them present and we return the data to Next.js.

```
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
```
#### function **requestRoster.ts**
This is the request that we make to the API that calls the function *getClassRoster()* these two functions work together to retrieve and send the data across our stack.
```
export default async function requestRoster( classID: number ) {
    try {
        const req: Response = await fetch( process.env.NEXT_PUBLIC_API_URL + '/getRoster', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ classID: classID })
        });

        const data: any = await req.json();
        console.log("This is the Roster Data Receieved:", data);
        return data;
    } catch (error) {
        console.error('Login Failed:', error);
        return [];
    }
}
```
---

___**The data structure of the Attendance table we are using in these functions have these columns**___
* attendanceID: *int*
* classID: *int*
* recordDate: *date*
* recorded_at: *timestamp*
* recorded_by: *int (professorID)*
* studentID: *int*
* studentStatus: *enum('unexcused', 'excused', 'late')*

---

### Another Key Method/Data Structure

This is also apart of my Student Roster/Attendance taker component

#### function *submitAttendance()* inside of **db_api.py**

This is how we would get that information from our database using our Flask API. We first call our cursor to be able to query the database, then we get all of the data from the request we made which has the classID, professorID, and the lists of the excused, unexcused, and late studentIDs, we are also pulling the current date so we have the right date to record the absence on.

```
def submitAttendance(data):
    db, cursor = getCursor() //gets the cursor for us to query the DB
    try:
        current_time = datetime.now().strftime('%Y-%m-%d') # gets the current date in YYYY-MM-DD
        classID = data.get('classID') # pulls classID parameter from request
        professorID = data.get('professorID') # pulls professorID from request
        lists = data.get('lists', {}) # pulls our lists of excused, unexcused, and late absences we sent with the request
        
        for status, student_ids in lists.items(): # goes through every ID in the status lists and adds the ID with their status from the list the ID was in
            for student_id in student_ids:
                cursor.execute(
                    """INSERT INTO Attendance 
                       (studentID, studentStatus, recordDate, classID, recorded_by)
                       VALUES (%s, %s, %s, %s, %s)""",
                    (student_id, status.lower(), current_time, classID, professorID)
                )
        return {'success': True}
```

#### function *requestStudentAttendance.ts*
This is the other request that we make to the API that calls the other function *submitAttendace()* these two functions work together to retrieve and send the data across our stack.

```
interface AttendanceLists {
    excused: number[];
    unexcused: number[];
    late: number[];
} // we are creating an interface to define the structure of the data we are going to send

export default async function requestSubmitAttendance(lists: AttendanceLists, classID: number, professorID: number) {
    try {
        const req: Response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/submitAttendance', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                lists, // these are lists with studentIDs in them labeled 'excused','unexcused', and 'late'
                classID,
                professorID
            })
        });
        
        const data = await req.json();
        console.log("Attendance submission response:", data);
        return data.success;
    } catch (error) {
        console.error('Attendance submission failed:', error);
        return false;
    }
}
```

---

### Project Management

For this project, I didn't really use any specific type of discipline to organize a schedule. I used a pretty basic schedule of just working with however much time I had inside and outside of class time. I did have some semblance of a timeline, even though it wasn't really set 100% in stone. For the first week, I worked on a lot of the frontend design components and placeholders, provisioned and setting up a server for me to host the website, and setting up my multiple development environments I had to work in. In the second week, the first two days of the week was dedicated to me designing and implementing the database and the API that was going to be interacting with the database. The second half of that week was me finally adding some functionality like login and making requests to some parts of the website to see how I wanted to move data throughout my application. The third week was just me working, adding more features and requests and getting all of the temporary frontend placeholder design off of the page and actual database data on the page. I tracked my progress with how many features I was getting done compared to what I had planned, the first week was me setting up the design of those features, the second week was me setting up the data structures and requests for the features, and the third week was me implementing however many number of features on the pages as I could.

---

### What I learned

I learned a bunch about how frontend development with frameworks like Next.js with React actually works. I also learned a lot about how the framework renders the components, how the components move data, and what some of the best practices are when you would be designing something for production. I learned some typescript and MySQL syntax i've never seen before. Some things are:
* indexes in MySQL
* '?' terniary operator in typescript
* when to use certain React hooks
* double bang '!!' operator in typescript

--- 

### Problems and Solutions

Considering this was my first time creating an entire application using any type of React framework, especially with Next.js I would say I had a ton of problems, but they were definitely problems with some of my inexperience with the types of libraries that I was using, and with how some of the components and hooks work. I was having some problems with managing my user sessions, the sessions wouldn't persist sometimes and  it would just sporadically 'log out' the user and send them back to the dashboard unable to get back in. It was a lot of console logging in my API, my requests to the API, and even from the components on the page themselves to figure out where I was losing my data. I was able to get a lot of help from other people having similar issues to me on websites like StackOverflow, the React reddit, and also the Next.js reddit, and they suggested instead of using states and such, that I just use a library like zustand, and from there I was able to create a user session store that saved in browser and persisted across changes.

---

### What Next?
If I had more time, I would definitely like to add more features. I would also like to see how this project would work at scale. Another feature that would've been on the top of the list is creating a page and the components needed to generate pdf reports that the user could download from the website for a specific student. I think that would bring the overall value of the application up being able to export the data generated to be able to send else where, possibly like a registrar or something. I definitely would want to make it so that the report you are able to generate is customizable for different use cases and different colleges to be able to fit to their needs of attendance data, possibly in formats other than a pdf.
