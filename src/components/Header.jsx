import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'ACCUEIL', href: '/', path: '/' },
  { label: 'PORTFOLIO', href: '/portfolio', path: '/portfolio' },
  { label: 'SERVICES', href: '/services', path: '/services' },
  { label: 'A PROPOS', href: '/apropos', path: '/apropos' },
  { label: 'CONTACT', href: '/contact', path: '/contact' },
]

export default function Header() {
  const location = useLocation()

  return (
    <header className="fixed top-0 left-0 w-full h-32 z-50">

      <div className="absolute left-1/2 top-6 -translate-x-1/2">
        <Link
          to="/"
          className="text-white"
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '2.4rem',
            letterSpacing: '0.1em',
          }}
        >
          SHØT
        </Link>
      </div>

      <nav className="absolute right-15 top-10 flex flex-col items-end gap-4">
        {NAV_LINKS.map(({ label, href, path }) => (
          <Link
            key={href}
            to={href}
            className="text-white text-sm tracking-widest transition-colors duration-200 hover:text-orange-400"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              borderBottom: location.pathname === path ? '1px solid white' : 'none',
              paddingBottom: '2px',
            }}
          >
            {label}
          </Link>
        ))}
      </nav>

    </header>
  )
}