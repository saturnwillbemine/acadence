export default async function requestProfClasses(profID: number) {
    try {
        console.log('Sending request with profID:', profID); // Add this debug line

        const req: Response = await fetch('http://localhost:5000/getProfClasses', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ professorID: profID })
        });
        
        const data: any = await req.json();

        console.log("this is the", data);

        return data;
    } catch (error) {
        console.error('Login Failed:', error);
        return false;
    }
}