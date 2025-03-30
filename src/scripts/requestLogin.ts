import { useSession } from "./userSessionStore";

export default async function requestLogin(user: string, pass: string) {
    try {
        useSession.getState().clearSession();

        const req: Response = await fetch( process.env.NEXT_PUBLIC_API_URL + '/validate', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: user, pass: pass })
        });
        
        const data: any = await req.json();

        console.log('Login response:', data); // this is the login response im getting from request

        if (data.success) {
            useSession.getState().setSession({
              isAuthenticated: true,
              username: data.username,
              professorName: data.professorName,
              professorID: data.professorID,
              hydrated: true
            })
            console.log('LocalStorage after login:', localStorage.getItem('user-session'))
            console.log('Session after login:', useSession.getState());
            return true;    
          }

          return false;

    } catch (error) {
        console.error('Login Failed:', error);
        return false;
    }
}