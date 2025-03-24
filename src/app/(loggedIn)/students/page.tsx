import StudentListSort from "@/app/components/StudentList";
import StudentCalendar from "@/app/components/StudentCalendar";

  export default function Students() {

      return (
        <div>
          <h1>Student List</h1>
          <p>This should show a selectable list of students where i can pull up their attendance data</p>
          <div style={{ display: 'flex', flexDirection: 'row'}} >
          <StudentListSort/>
          <div style={{marginTop: '5%'}}>
            <StudentCalendar/>
          </div>
=          </div>
        </div>
      );
    }