export default async function requestClassCreation( professorID: number, className: string, deptName: string, classDesc: string ) {
    try {

        const req: Response = await fetch( process.env.NEXT_PUBLIC_API_URL + '/createClass', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ professorID: professorID, className: className, deptName: deptName, classDesc: classDesc })
        });
        
        const data: any = await req.json();
        console.log("Adding class:", data);
        return data;
    } catch (error) {
        console.error('Creation Failed:', error);
        return false;
    }
}