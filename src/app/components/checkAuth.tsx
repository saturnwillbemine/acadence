'use client'
import { useSession } from "../../scripts/userSessionStore"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

export default function CheckAuth({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useSession((state) => state.isAuthenticated)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    if (!isAuthenticated && pathname !== '/') {
      // not authenticated and not at login, redirect to login
      router.push('/')
    } else if (isAuthenticated && pathname === '/') {
      // user is authenticated and at root path, send to dash
      router.push('/dashboard')
    }
  }, [isAuthenticated, pathname, mounted, router])

  // block render if not authenticated and not at login page
  if (!mounted || (!isAuthenticated && pathname !== '/')) return null

  return <>{children}</>
}