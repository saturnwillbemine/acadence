import { useSession } from "./userSessionStore";

export default async function requestStudentList(profID: string, classID: string, keepLogin: boolean) {
    try {
        const req: Response = await fetch('http://localhost:5000/getRoster', {
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