'use client';
import StudentListSort from "@/app/components/StudentList";
import StudentCalendar from "@/app/components/StudentCalendar";
import { useSession } from "@/scripts/userSessionStore";

  export default function Students() {
    const professorID = useSession((state) => state.professorID)

      return (
        <div>
          <h1>Student List</h1>
          <p>This should show a selectable list of students where i can pull up their attendance data</p>
          <div style={{ display: 'flex', flexDirection: 'row'}} >
          <StudentListSort professorID={professorID}/>
          <div style={{marginTop: '5%'}}>
            <StudentCalendar/>
          </div>
=          </div>
        </div>
      );
    }