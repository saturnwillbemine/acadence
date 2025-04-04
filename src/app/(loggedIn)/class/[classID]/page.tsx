import AttendanceStats from "@/app/components/AttendanceStats";
import StudentAttendance from '@/app/components/StudentAttendance';
import AddStudentButton from "@/app/components/AddStudentButton";

// wait for promise and load class ID and data, 
export default async function Class({ params, } : { params: Promise<{classID: number}> }) {

  const { classID } = await params;

  return (
    <div>
      <AttendanceStats classID={classID}/>
      <div style={{display: 'flex', flexDirection: 'row', 
                   justifyContent: 'space-between', 
                   alignItems: 'center', 
                   marginRight:'10px', 
                   marginLeft:'10px',
                   }}>
        <h2>Class Roster</h2>
        <AddStudentButton classID={classID}/>
      </div>
      <StudentAttendance classID={classID}/>
    </div>
  );
}
