import { useSession } from "./userSessionStore";

export default async function requestLogin(user: string, pass: string, keepLogin: boolean) {
    try {
        const req: Response = await fetch('http://localhost:5000/validate', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: user, pass: pass, keepLogin: keepLogin})
        });
        
        const data: any = await req.json();

        console.log(data);
        console.log('Login response:', data);
        console.log('Keep logged in:', keepLogin);
        
        if (data.success) {
            useSession.getState().setSession({
              isAuthenticated: true,
              username: data.username,
              professorName: data.professorName,
              professorId: data.professorId,
              keepLoggedIn: keepLogin,
              hydrated: true
            })
            return true;
          }

          return false;

    } catch (error) {
        console.error('Login Failed:', error);
        return false;
    }
}