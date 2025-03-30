import { useSession } from "./userSessionStore";

export default async function requestStudentList(profID: string, classID: string) {
    try {
        const req: Response = await fetch( process.env.NEXT_PUBLIC_API_URL + '/getRoster', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ professorID: profID, classID: classID})
        });
        
        const data: any = await req.json();

        console.log(data);

        return data;

    } catch (error) {
        console.error('Login Failed:', error);
        return false;
    }
}