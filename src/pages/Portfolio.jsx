import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isMobile
}

const COLLABORATIONS = [
  { id: 'arewa', title: 'AREWA BIOHABITAT', location: 'Colombie, 2026', image: '/services.png' },
  { id: 'finca', title: 'FINCA CARPE DIEM', location: 'Colombie, 2026', image: '/finca.jpg' },
  { id: 'jaja', title: 'JAJA TOUR', location: 'Bolivie, 2025', image: '/jaja.jpg' },
]

const HISTOIRES = [
  { id: 'cordillere', title: 'CORDILLÈRE ROYALE', location: 'Bolivie, 2025', image: '/cordillere.jpg' },
  { id: 'desert', title: "DÉSERT D'ATACAMA", location: 'Chili, 2025', image: '/atacama.jpg' },
  { id: 'amerique', title: 'AMÉRIQUE DU SUD', location: 'Amérique du sud, 2025', image: '/amerique.jpg' },
]

const GALERIE = [
  { id: 'g1', title: '', location: '', image: '/portfolio.jpg' },
  { id: 'g2', title: '', location: '', image: '/services.png' },
  { id: 'g3', title: '', location: '', image: '/portfolio.jpg' },
  { id: 'g4', title: '', location: '', image: '/services.png' },
  { id: 'g5', title: '', location: '', image: '/portfolio.jpg' },
  { id: 'g6', title: '', location: '', image: '/services.png' },
]

const CATEGORIES = [
  { num: '01', label: 'COLLABORATIONS', anchor: 'collaborations' },
  { num: '02', label: "HISTOIRES D'AILLEURS", anchor: 'histoires' },
  { num: '03', label: 'GALERIE', anchor: 'galerie' },
]

const ProjectCard = ({ id, title, location, image, isMobile }) => {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()
  const handleClick = () => navigate(`/projet/${id}`)

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        className="w-full relative cursor-pointer"
        style={{ height: isMobile ? '280px' : '450px' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            className="text-white tracking-widest"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.85rem', letterSpacing: '0.3em' }}
          >
            DÉCOUVRIR LE PROJET
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '0.8rem' }}>
        <div>
          <h3
            className="text-white uppercase"
            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: isMobile ? '1.4rem' : '1.9rem' }}
          >
            {title}
          </h3>
          <p
            className="text-white/60"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: isMobile ? '0.8rem' : '1rem', marginTop: '0.2rem' }}
          >
            {location}
          </p>
        </div>
        <div
          className="cursor-pointer hover:text-orange-400 transition-colors duration-200"
          style={{ color: 'white', marginTop: '0.4rem' }}
          onClick={handleClick}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </div>
    </div>
  )
}

const SectionGrid = ({ id, num, title, description, items, paddingTop = '4rem', isMobile }) => (
  <section id={id} style={{ paddingTop, backgroundColor: '#141414' }}>

    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '2rem',
        paddingLeft: isMobile ? '6%' : '15%',
        paddingRight: isMobile ? '6%' : '15%',
      }}
    >
      <div style={{ width: '100%', borderTop: '1px solid rgba(255,255,255,0.3)' }} />
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
        <span className="text-white text-base">+</span>
        <span className="text-white text-base">+</span>
      </div>
    </div>

    <div
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center',
        justifyContent: 'space-between',
        paddingLeft: isMobile ? '6%' : '15%',
        paddingRight: isMobile ? '6%' : '15%',
        marginBottom: '2rem',
        gap: isMobile ? '0.5rem' : '0',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
        <span className="text-white" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: isMobile ? '2rem' : '3rem' }}>{num}</span>
        <span className="text-white uppercase" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: isMobile ? '2rem' : '3rem' }}>{title}</span>
      </div>
      <p
        className="text-white/70"
        style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.85rem', textAlign: isMobile ? 'left' : 'right', maxWidth: '280px' }}
      >
        {description}
      </p>
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: '1.5rem',
        paddingLeft: isMobile ? '6%' : '15%',
        paddingRight: isMobile ? '6%' : '15%',
        paddingBottom: '4rem',
      }}
    >
      {items.map((item) => (
        <ProjectCard key={item.id} {...item} isMobile={isMobile} />
      ))}
    </div>

  </section>
)

export default function Portfolio() {
  const isMobile = useIsMobile()

  return (
    <div style={{ backgroundColor: '#141414' }}>

      {/* Hero */}
      <section
        className="relative"
        style={{
          height: '75vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: isMobile ? 'flex-start' : 'center',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/portfolio.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center 80%',
            backgroundAttachment: isMobile ? 'scroll' : 'fixed',
          }}
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Titre */}
        <div
          className="relative z-10"
          style={{
            paddingLeft: isMobile ? '6%' : '15%',
            paddingTop: isMobile ? '5rem' : '0',
          }}
        >
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', height: '75vh' }}>
              <h1
                className="text-white uppercase"
                style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: '4.2rem',
                  letterSpacing: '0.02em',
                  lineHeight: 1.1,
                }}
              >
                DÉCOUVREZ<br />NOTRE UNIVERS.
              </h1>
            </div>
          )}
          {isMobile && (
            <h1
              className="text-white uppercase"
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: '3rem',
                letterSpacing: '0.02em',
                lineHeight: 1.1,
                marginTop: '11.5rem',

              }}
            >
              DÉCOUVREZ<br />NOTRE UNIVERS.
            </h1>
          )}
        </div>

        {/* Sommaire mobile en bas */}
        {isMobile && (
          <div
            className="relative z-10"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '0.8rem',
              paddingLeft: '6%',
              paddingBottom: '2.5rem',
              marginTop: '3rem',

            }}
          >
            {CATEGORIES.map(({ num, label, anchor }) => (
              <a
                key={num}
                href={`#${anchor}`}
                className="flex items-center text-white hover:text-orange-400 transition-colors duration-200"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.8rem',
                  letterSpacing: '0.2em',
                  gap: '1.5rem',
                }}
              >
                <span style={{ color: 'rgba(255,255,255,0.5)', minWidth: '1.5rem' }}>{num}</span>
                <span>{label}</span>
              </a>
            ))}
          </div>
        )}

        {/* Sommaire desktop à droite */}
        {!isMobile && (
          <div
            className="absolute right-0 top-0 h-full z-10 flex flex-col justify-center items-end"
            style={{ paddingRight: '15%' }}
          >
            {CATEGORIES.map(({ num, label, anchor }) => (
              <a
                key={num}
                href={`#${anchor}`}
                className="flex items-center text-white hover:text-orange-400 transition-colors duration-200"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '1rem',
                  letterSpacing: '0.2em',
                  gap: '4rem',
                  marginBottom: '1.5rem',
                }}
              >
                <span style={{ color: 'rgba(255,255,255,0.5)', minWidth: '2rem', textAlign: 'right' }}>{num}</span>
                <span style={{ minWidth: '260px', textAlign: 'right' }}>{label}</span>
              </a>
            ))}
          </div>
        )}
      </section>

      <SectionGrid
        id="collaborations"
        num="01"
        title="COLLABORATIONS"
        description="Les projets réalisés pour nos clients."
        items={COLLABORATIONS}
        paddingTop="2rem"
        isMobile={isMobile}
      />

      <SectionGrid
        id="histoires"
        num="02"
        title="HISTOIRES D'AILLEURS"
        description="Nos plus beaux souvenirs autour du globe, racontés en image."
        items={HISTOIRES}
        paddingTop="0rem"
        isMobile={isMobile}
      />

      <SectionGrid
        id="galerie"
        num="03"
        title="GALERIE"
        description="Un condensé de nos plus belles photos."
        items={GALERIE}
        paddingTop="0rem"
        isMobile={isMobile}
      />

    </div>
  )
}