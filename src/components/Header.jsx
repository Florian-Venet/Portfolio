'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useIsMobile } from '../hooks/useIsMobile'

const NAV_LINKS = [
  { label: 'ACCUEIL', href: '/' },
  { label: 'PORTFOLIO', href: '/portfolio' },
  { label: 'SERVICES', href: '/services' },
  { label: 'À PROPOS', href: '/apropos' },
  { label: 'CONTACT', href: '/contact' },
]

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile = useIsMobile()

  return (
    <header className="fixed top-0 left-0 w-full h-32 z-50">

      {/* Logo centré */}
      <div className="absolute left-1/2 top-6 -translate-x-1/2">
        <Link
          href="/"
          className="text-white"
          style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.4rem', letterSpacing: '0.1em' }}
        >
          ELØRIA
        </Link>
      </div>

      {/* Desktop : nav verticale droite — toujours visible */}
      {!isMobile && (
        <nav className="absolute right-15 top-10 flex flex-col items-end gap-4">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-white text-sm tracking-widest transition-colors duration-200 hover:text-orange-400"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                borderBottom: pathname === href ? '1px solid white' : 'none',
                paddingBottom: '2px',
              }}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}

      {/* Mobile : hamburger */}
      {isMobile && (
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            position: 'absolute',
            top: '2rem',
            right: '1.5rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            padding: '0.5rem',
            zIndex: 60,
          }}
        >
          <span style={{ display: 'block', width: '22px', height: '1.5px', backgroundColor: 'white' }} />
          <span style={{ display: 'block', width: '22px', height: '1.5px', backgroundColor: 'white' }} />
          <span style={{ display: 'block', width: '22px', height: '1.5px', backgroundColor: 'white' }} />
        </button>
      )}

      {/* Mobile : nav qui apparaît */}
      {isMobile && menuOpen && (
        <nav
          style={{
            position: 'absolute',
            top: '5rem',
            right: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '1.2rem',
            backgroundColor: 'rgba(20,20,20,0.40)',
            padding: '1.5rem',
            zIndex: 50,
          }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-white text-sm tracking-widest transition-colors duration-200 hover:text-orange-400"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                borderBottom: pathname === href ? '1px solid white' : 'none',
                paddingBottom: '2px',
              }}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}

    </header>
  )
}
