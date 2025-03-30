export default async function requestRoster( classID: number ) {
    try {
        const req: Response = await fetch( process.env.NEXT_PUBLIC_API_URL + '/getRoster', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ classID: classID })
        });

        const data: any = await req.json();
        console.log("This is the Roster Data Receieved:", data);
        return data;
    } catch (error) {
        console.error('Login Failed:', error);
        return [];
    }
}