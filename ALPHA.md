# Alpha Release

## Purpose
Through this exercise I hope to learn more about the deployment of computer applications to a production environment and understanding more about just full stack development in general. I don't exactly want to be a full stack developer, but I feel that this experience with working with all of these different types of tools and languages will always be a valuable experience when it comes to working with servers and networks that host these tools and move data throughout these applications. I plan to have a well designed web application to show employers, along with things like the networks I've made and a decent understanding database design.

## Progress
I have completed around 3 out of around 8 of the features I hope to add, but those 3 features were the ones that were going to take me the longest. The next couple of features I will be able to add relatively quickly compared to the other ones because some of what I've already written for the first three could be used for some of the features. It will also go by faster as now I have a better understanding of the tools I'm working with and how they interact with one another. In terms of functions I have around ~9 or 10 functions with some more to go, probably around 1 or 2 per feature.

## Vocab
Although my use of model-view-controller wasn't intentional, looking at my project it definitely does follow this design pattern.
* Model View Controller
  * A software design pattern that divides the application logic into three components that all come together. 
  * **Model** 
    * the internal representation/structure of the data of the application. in my project, it would be the MySQL database.
  * **View** 
    *  this is the interface that the user interacts with. in this component, the user in presented with the information from the model and here they can provide information to the view to give to the model. in my project it would be React and Mantine providing the view.
  * **Controller** 
    * this is the interface that connects both the model and the view, it gets the user input from the view and can perform interactions on the model. in my project, this is my flask API and Next.js requests going to that API

## Organization
The IDE did start with giving me a basic React folder structure. I changed it to this though by putting everything into src/app and a src/scripts. The parenthesis around the **loggedIn** folder indicate that its a group in which only the **layout.tsx** in the folder renders on top of every page in it.

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

## Key Data Structure and Function
This is the function that the API performs when called to query the database and grab the student roster for a certain class and that class' attendance for the day. For attendance, we grab all of the absent/late students and put them in a dictionary. We then go through that list of students and if the student isn't in the dictionary with an absence we mark them present and we return the data to Next.js.

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
The data structure of the Attendance table has these columns
* attendanceID: int
* classID: int
* recordDate: date
* recorded_at: timestamp
* recorded_by: int (professorID)
* studentID: int
* studentStatus: enum('unexcused', 'excused', 'late')

An example of how I'm adding an absence to the record table, this would show up on the web app in the class roster section.
`INSERT INTO Attendance (studentID, studentStatus, recordDate, classID, recorded_by) VALUES
(1, 'unexcused', '2025-03-30', 1, 1);`

This is what the professor would see after marking them.

https://i.ibb.co/01zzN0V/Screenshot-2025-03-31-at-8-44-06-AM.png