import AttendanceStats from "@/app/components/AttendanceStats";
import StudentTable from '@/app/components/StudentAttendance';
import AddStudentButton from "@/app/components/AddStudentButton";

export default async function Class({
  params,
} : {
  params: Promise<{classID: number}>
}) {
  const { classID } = await params;

  return (
    <div>
      <AttendanceStats />
      <div style={{display: 'flex', flexDirection: 'row', 
                   justifyContent: 'space-between', 
                   alignItems: 'center', 
                   marginRight:'10px', 
                   marginLeft:'10px',
                   }}>
        <h2>Class Roster</h2>
        <AddStudentButton />
      </div>
      <StudentTable />
      This is the class page, they should have a different one for each classID
      This one's classID is {classID}
    </div>
  );
}
