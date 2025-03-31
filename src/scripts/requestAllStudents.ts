export default async function requestAllStudents( professorID: number ) {
    try {

        const req: Response = await fetch( process.env.NEXT_PUBLIC_API_URL + '/getAllStudents', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ professorID: professorID })
        });
        
        const data: any = await req.json();
        console.log("Requesting all of this professors students:", professorID);
        console.log("Here is the data", data);

        return data;
    } catch (error) {
        console.error('Creation Failed:', error);
        return false;
    }
}