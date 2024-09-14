'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function NavLinks() {
  const pathname = usePathname()

  return (
    <nav>
      <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">Home</Link>
      <Link className={`link ${pathname === '/about' ? 'active' : ''}`} href="/about">About</Link>
      <Link className={`link ${pathname === '/dashboard' ? 'active' : ''}`} href="/dashboard">Dashboard</Link>
      <Link className={`link ${pathname === '/dashboard/settings' ? 'active' : ''}`} href="/dashboard/settings">Settings</Link>
      <Link href="/blog/xxx">Blog-xxx</Link>
      <Link href="/slots">Slots</Link>
    </nav>
  )
}