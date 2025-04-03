'use client';
import StudentListSort from "@/app/components/StudentList";
import StudentCalendar from "@/app/components/StudentCalendar";
import { useSession } from "@/scripts/userSessionStore";
import { useEffect, useState } from "react";
import requestStudentAttendance from "@/scripts/requestStudentAttendance";

  export default function Students() {
    const professorID = useSession((state) => state.professorID)
    const [selection, setSelection] = useState<string>('');
    const [attendanceData, setAttendanceData] = useState([]);

    const getStudentAttendance = async () => {
            const data = await requestStudentAttendance(selection);
            console.log(data);
            setAttendanceData( data || []);
          };

    useEffect(() => {
        if (selection) {
          getStudentAttendance();
        } else {
          setAttendanceData([]);
        }
     }, [selection]);

      return (
        <div>
          <h1>Student List</h1>

          <div style={{ display: 'flex', flexDirection: 'row'}}>
          <StudentListSort professorID={professorID}
                           setSelection={setSelection}
                           selection={selection}/>

          <div style={{marginTop: '5%'}}>
            <StudentCalendar attendanceData={attendanceData}/>
          </div>
          </div>
        </div>
      );
    }