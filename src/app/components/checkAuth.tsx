'use client'
import { useSession } from "../../scripts/userSessionStore"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

export default function CheckAuth({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useSession((state) => state.isAuthenticated)
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  //makes sure the appshell and other necessary components are loaded on client side
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isAuthenticated && pathname !== '/') { // making sure user is loaded and logged in 
      router.push('/')
    }
  }, [isAuthenticated, router, mounted, pathname])

  if ( !mounted || !isAuthenticated ) return null

  return <>{children}</>
}