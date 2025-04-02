export default async function requestStudentAttendance( studentName: string ) {
    try {
        console.log(`sending requests for ${studentName}'s attendance`); // Add this debug line

        const req: Response = await fetch( process.env.NEXT_PUBLIC_API_URL + '/getStudentAttendance', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ studentName: studentName })
        });
        
        const data: any = await req.json();
        console.log("These are the absences we got back", data);
        return data;
    } catch (error) {
        console.error('Login Failed:', error);
        return false;
    }
}