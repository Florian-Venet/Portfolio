import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      style={{ backgroundColor: '#141414', paddingTop: '3rem', paddingBottom: '1rem', paddingLeft: '2rem', paddingRight: '2rem' }}
      className="sm:px-[15%]"
    >

      {/* Mobile : logo centré puis contact/réseaux côte à côte */}
      {/* Desktop : contact | logo absolu centré | réseaux */}

      {/* Logo — mobile: visible ici centré ; desktop: absolu */}
      <div className="flex justify-center mb-6 md:hidden">
        <Link
          href="/"
          className="text-white"
          style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', letterSpacing: '0.1em' }}
        >
          ELØRIA
        </Link>
      </div>

      {/* Contenu principal */}
      <div className="relative flex justify-between items-start" style={{ marginBottom: '1rem' }}>

        {/* Contact gauche */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingTop: '2rem' }}>
          <span
            className="text-white/50 tracking-widest"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.7rem' }}
          >
            CONTACT
          </span>
          <a
            href="mailto:contact@eloria.com"
            className="text-white hover:text-orange-400 transition-colors duration-200"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.80rem' }}
          >
            contact@eloria.com
          </a>
        </div>

        {/* Logo centré — desktop seulement */}
        <Link
          href="/"
          className="text-white hidden md:block absolute left-1/2 -translate-x-1/2"
          style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', letterSpacing: '0.1em' }}
        >
          ELØRIA
        </Link>

        {/* Réseaux droite */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem', paddingTop: '2rem' }}>
          <span
            className="text-white/50 tracking-widest"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.7rem' }}
          >
            SUIVEZ-NOUS
          </span>
          <a
            href="https://www.instagram.com/eloriafilms"
            target="_blank"
            rel="noreferrer"
            className="text-white hover:text-orange-400 transition-colors duration-200"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.80rem' }}
          >
            Instagram
          </a>
          <a
            href="https://www.youtube.com/@user-ce5sj6cl6p"
            target="_blank"
            rel="noreferrer"
            className="text-white hover:text-orange-400 transition-colors duration-200"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.80rem' }}
          >
            YouTube
          </a>
        </div>

      </div>

      {/* Copyright */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.10)', marginTop: '1.5rem', paddingTop: '0.5rem', textAlign: 'center' }}>
        <span
          className="text-white/30 tracking-widest"
          style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.7rem' }}
        >
          © 2026 ELØRIA. TOUS DROITS RÉSERVÉS.
        </span>
      </div>

    </footer>
  )
}