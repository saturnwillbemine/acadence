export default async function requestProfClasses(profID: number) {
    try {
        console.log('Sending request with profID:', profID); // Add this debug line

        const req: Response = await fetch( process.env.NEXT_PUBLIC_API_URL + '/getProfClasses', {
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