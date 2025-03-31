export default async function requestStudentCreation( classID: number, studentName: string ) {
    try {

        const req: Response = await fetch( process.env.NEXT_PUBLIC_API_URL + '/createStudent', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ classID: classID, studentName: studentName })
        });
        
        const data: any = await req.json();
        console.log("Adding student:", data);
        return data;
    } catch (error) {
        console.error('Creation Failed:', error);
        return false;
    }
}