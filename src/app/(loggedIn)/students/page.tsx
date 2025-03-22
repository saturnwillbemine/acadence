import StudentListSort from "@/app/components/StudentList";

  export default function Students() {

      return (
        <div> 
          <h1>Student List</h1>
          <p>This should show a selectable list of students where i can pull up their attendance data 🤔 </p>
          <StudentListSort/>

        </div>
      );
    }