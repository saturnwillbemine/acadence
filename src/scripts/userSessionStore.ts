import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UserSession {
  isAuthenticated: boolean //if they are logged in or not
  username: string 
  professorName: string
  professorID: number
  hydrated: boolean
  setSession: (data: Partial<UserSession>) => void //sets session data
  clearSession: () => void // log out for session
}

export const useSession = create<UserSession>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      username: '',
      professorName: '',
      professorID: 0,
      hydrated: false,
      setSession: (data) => set((state) => ({ ...state, ...data })),
      clearSession: () => {
        localStorage.removeItem('user-session') //clear storage
        set({ 
        isAuthenticated: false, 
        username: '', 
        professorName: '', 
        professorID: 0,
        hydrated: true,
      })
    },
    }),
    {
      name: 'user-session',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setSession({ hydrated: true })
      }
    }
  )
)