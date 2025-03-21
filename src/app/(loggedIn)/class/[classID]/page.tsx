import AttendanceStats from "@/app/components/AttendanceStats";
import StudentTable from '@/app/components/StudentAttendance';

export default async function Class({
  params,
} : {
  params: Promise<{classID: number}>
}) {
  const { classID } = await params;

  return (
    <div>
      <AttendanceStats />
    <div style={{margin: '10px'}}>
      <h2>Class Roster</h2>
    </div>
      <StudentTable />
      This is the class page, they should have a different one for each classID
      This one's classID is {classID}
    </div>
  );
}