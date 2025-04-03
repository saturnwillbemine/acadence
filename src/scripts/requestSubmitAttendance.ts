interface AttendanceLists {
    excused: number[];
    unexcused: number[];
    late: number[];
}

export default async function requestSubmitAttendance(lists: AttendanceLists, classID: number, professorID: number) {
    try {
        const req: Response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/submitAttendance', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                lists,
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