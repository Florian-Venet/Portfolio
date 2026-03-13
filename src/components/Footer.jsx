export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#141414',
        paddingTop: '3rem',
        paddingBottom: '2rem',
        paddingLeft: '15%',
        paddingRight: '15%',
      }}
    >
      {/* Trait */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', marginBottom: '2.5rem' }} />

      {/* Contenu principal */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>

        {/* Contact gauche */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <span
            className="text-white/50 tracking-widest"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.7rem' }}
          >
            CONTACT
          </span>
          <a  href="mailto:contact@shot.com"
            className="text-white hover:text-orange-400 transition-colors duration-200"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.85rem' }}
          >
            contact@shot.com
          </a>
        </div>

        {/* Logo centré */}
        <a
          href="/"
          className="text-white"
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '2rem',
            letterSpacing: '0.1em',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          SHØT
        </a>

        {/* Réseaux droite */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
          <span
            className="text-white/50 tracking-widest"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.7rem' }}
          >
            SUIVEZ-NOUS
          </span>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="text-white hover:text-orange-400 transition-colors duration-200"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.85rem' }}
          >
            Instagram
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="text-white hover:text-orange-400 transition-colors duration-200"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.85rem' }}
          >
            YouTube
          </a>
        </div>

      </div>

      {/* Copyright */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.10)', paddingTop: '1.5rem', textAlign: 'center' }}>
        <span
          className="text-white/30 tracking-widest"
          style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.7rem' }}
        >
          © 2025 SHØT. TOUS DROITS RÉSERVÉS.
        </span>
      </div>

    </footer>
  )
}