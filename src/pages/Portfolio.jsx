import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const COLLABORATIONS = [
  {
    id: 'arewa',
    title: 'AREWA BIOHABITAT',
    location: 'Colombie, 2026',
    image: '/services.png',
  },
  {
    id: 'finca',
    title: 'FINCA CARPE DIEM',
    location: 'Colombie, 2026',
    image: '/finca.jpg',
  },
  {
    id: 'jaja',
    title: 'JAJA TOUR',
    location: 'Bolivie, 2025',
    image: '/jaja.jpg',
  },
]

const HISTOIRES = [
  {
    id: 'cordillere',
    title: 'CORDILLÈRE ROYALE',
    location: 'Bolivie, 2025',
    image: '/cordillere.jpg',
  },
  {
    id: 'desert',
    title: "DÉSERT D'ATACAMA",
    location: 'Chili, 2025',
    image: '/atacama.jpg',
  },
  {
    id: 'amerique',
    title: 'AMÉRIQUE DU SUD',
    location: 'Amérique du sud, 2025',
    image: '/amerique.jpg',
  },
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

const ProjectCard = ({ id, title, location, image }) => {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/projet/${id}`)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      {/* Image avec hover */}
      <div
        className="w-full relative cursor-pointer"
        style={{ height: '450px' }}
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
        {/* Voile hover */}
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

      {/* Titre + flèche */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '0.8rem' }}>
        <div>
          <h3
            className="text-white uppercase"
            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.9rem' }}
          >
            {title}
          </h3>
          <p
            className="text-white/60"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1rem', marginTop: '0.2rem' }}
          >
            {location}
          </p>
        </div>

        {/* Flèche */}
        <div
          className="cursor-pointer hover:text-orange-400 transition-colors duration-200"
          style={{ color: 'white', marginTop: '0.4rem' }}
          onClick={handleClick}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </div>

    </div>
  )
}

const SectionGrid = ({ id, num, title, description, items, paddingTop = '4rem' }) => (
  <section id={id} style={{ paddingTop, backgroundColor: '#141414' }}>

    <div className="flex flex-col items-center" style={{ marginBottom: '2rem' }}>
      <div className="w-[70%] border-t border-white/30" />
      <div className="flex justify-between items-center w-[70%] mt-2">
        <span className="text-white text-base">+</span>
        <span className="text-white text-base">+</span>
      </div>
    </div>

    <div
      className="flex items-start justify-between"
      style={{ paddingLeft: '15%', paddingRight: '15%', marginBottom: '2rem' }}
    >
      <div className="flex items-baseline gap-8">
        <span className="text-white" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '3rem' }}>{num}</span>
        <span className="text-white uppercase" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '3rem' }}>{title}</span>
      </div>
      <p
        className="text-white/70 text-right max-w-xs"
        style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1rem', alignSelf: 'center' }}
      >
        {description}
      </p>
    </div>

    <div
      className="grid grid-cols-2 gap-6"
      style={{ paddingLeft: '15%', paddingRight: '15%', paddingBottom: '4rem' }}
    >
      {items.map((item) => (
        <ProjectCard key={item.id} {...item} />
      ))}
    </div>

  </section>
)

export default function Portfolio() {
  return (
    <div style={{ backgroundColor: '#141414' }}>

      <section className="relative flex" style={{ height: '75vh', width: '100%' }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/portfolio.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center 80%',
            backgroundAttachment: 'fixed',
          }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex items-center flex-1" style={{ paddingLeft: '15%' }}>
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

        <div className="relative z-10 flex flex-col justify-center items-end gap-6" style={{ paddingRight: '15%' }}>
          {CATEGORIES.map(({ num, label, anchor }) => (
            <a
              key={num}
              href={`#${anchor}`}
              className="flex items-center text-white hover:text-orange-400 transition-colors duration-200"
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1rem', letterSpacing: '0.2em', gap: '4rem' }}
            >
              <span style={{ color: 'rgba(255,255,255,0.5)', minWidth: '2rem', textAlign: 'right' }}>{num}</span>
              <span style={{ minWidth: '260px', textAlign: 'right' }}>{label}</span>
            </a>
          ))}
        </div>
      </section>

      <SectionGrid
        id="collaborations"
        num="01"
        title="COLLABORATIONS"
        description="Les projets réalisés pour nos clients."
        items={COLLABORATIONS}
        paddingTop="2rem"
      />

      <SectionGrid
        id="histoires"
        num="02"
        title="HISTOIRES D'AILLEURS"
        description="Nos plus beaux souvenirs autour du globe, racontés en image."
        items={HISTOIRES}
        paddingTop="0rem"
      />

      <SectionGrid
        id="galerie"
        num="03"
        title="GALERIE"
        description="Un condensé de nos plus belles photos."
        items={GALERIE}
        paddingTop="0rem"
      />

    </div>
  )
}