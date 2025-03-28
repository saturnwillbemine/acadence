'use client'
import { useSession } from "../../scripts/userSessionStore"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

export default function CheckAuth({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useSession((state) => state.isAuthenticated)
  const keepLoggedIn = useSession((state) => state.keepLoggedIn)
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  //makes sure the appshell and other necessary components are loaded on client side
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && isAuthenticated && keepLoggedIn && pathname === '/') {
      router.push('/dashboard') //if user is logged in previously they are pushed
    } else if (mounted && !isAuthenticated && pathname !== '/') { // making sure user is loaded and logged in 
      router.push('/')
    }
  }, [isAuthenticated, keepLoggedIn, router, mounted, pathname])

  if ( !mounted || !isAuthenticated ) return null

  return <>{children}</>
}