import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Gallery from '../components/Gallery'
import { cloudinaryUrl } from '../utils/cloudinary'
import { useIsMobile } from '../hooks/useIsMobile'

const COLLABORATIONS = [
  { id: 'arewa', title: 'AREWA BIOHABITAT', location: 'Colombie, 2026', cloudinaryId: 'compressed_DJI_0001_ajt5wy', width: 1200 },
  { id: 'finca', title: 'FINCA CARPE DIEM', location: 'Colombie, 2026', cloudinaryId: 'FincaPool_puntbe' },
  { id: 'jaja',  title: 'JAJA TOUR',        location: 'Bolivie, 2025',  cloudinaryId: 'DSC08566_web_oba8s6' },
]

const HISTOIRES = [
  { id: 'cordillere', title: 'CORDILLÈRE ROYALE', location: 'Bolivie, 2025',        cloudinaryId:'DSC08485_ml2nvb' },
  { id: 'desert',     title: "DÉSERT D'ATACAMA",  location: 'Chili, 2025',           cloudinaryId: 'compressed_DSC08946_xvhgyx' },
  { id: 'amerique',   title: 'AMÉRIQUE DU SUD',   location: 'Amérique du sud, 2025', image: '/amerique.jpg' },
]

// ── Médias de la galerie ──────────────────────────────────────────────────────
// Remplacez ces entrées par vos vraies images / vidéos.
// Chaque item requiert : type, src, aspect (largeur/hauteur), alt ou label.
const GALERIE_MEDIA = [
  { id: 'm1',  type: 'image', cloudinaryId: 'DSC01475_oh8xxp', alt: 'Amérique 1', ratio: '3/2' },
      { id: 'm2',  type: 'image', cloudinaryId: 'DSC01752_beqghb', alt: 'Amérique 2', ratio: '3/2' },
      { id: 'm3',  type: 'image', cloudinaryId: 'DSC01716_lbzydi', alt: 'Amérique 3', ratio: '3/2' },
      { id: 'm4',  type: 'image', cloudinaryId: 'DSC02455_qvp2yf', alt: 'Amérique 4', ratio: '3/2' },
      { id: 'm5',  type: 'image', cloudinaryId: 'DSC02632_tpsqqk', alt: 'Amérique 5', ratio: '3/2' },
      { id: 'm6',  type: 'image', cloudinaryId: 'DSC02231_hwawfd', alt: 'Amérique 6', ratio: '3/2' },
      { id: 'm7',  type: 'image', cloudinaryId: 'DSC02036_atr8lp', alt: 'Amérique 7', ratio: '3/2' },
      { id: 'm8',  type: 'image', cloudinaryId: 'DSC02635_fmprv0', alt: 'Amérique 8', ratio: '3/2' },
      { id: 'm9',  type: 'image', cloudinaryId: 'DSC03080_jjgq9n', alt: 'Amérique 9', ratio: '3/2' },
      { id: 'm12', type: 'image', cloudinaryId: 'DSC02156_uoo27l', alt: 'Amérique 12', ratio: '3/2' },
{ id: 'm21', type: 'image', cloudinaryId: 'DSC04708_eu1jcq', alt: 'Amérique 21', ratio: '3/2' },
      { id: 'm22', type: 'image', cloudinaryId: 'DSC05271_xotq0k', alt: 'Amérique 22', ratio: '3/2' },
      { id: 'm23', type: 'image', cloudinaryId: 'DSC04764_yjjtiz', alt: 'Amérique 23', ratio: '3/2' },
      { id: 'm24', type: 'image', cloudinaryId: 'compressed_DSC00521_ie3mbn', alt: 'Amérique 24', ratio: '3/2' },
      { id: 'm25', type: 'image', cloudinaryId: 'compressed_DSC02713_y3w0ju', alt: 'Amérique 25', ratio: '3/2' },
      { id: 'm52', type: 'image', cloudinaryId: 'compressed_DSC04322_bcghlx', alt: 'Amérique 52', ratio: '3/2' },

]

const CATEGORIES = [
  { num: '01', label: 'COLLABORATIONS',     anchor: 'collaborations' },
  { num: '02', label: "HISTOIRES D'AILLEURS", anchor: 'histoires' },
  { num: '03', label: 'GALERIE',            anchor: 'galerie' },
]

// ─── Carte projet ─────────────────────────────────────────────────────────────

const ProjectCard = ({ id, title, location, image, cloudinaryId, width, isMobile }) => {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()
  const handleClick = () => navigate(`/projet/${id}`)
  

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        className="w-full relative cursor-pointer"
        style={{ aspectRatio: '5/4' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick()}
        role="button"
        tabIndex={0}
      >
        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${image || cloudinaryUrl(cloudinaryId, width)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.2s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
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

// ─── En-tête de section (séparateur + titre + description) ────────────────────

const SectionHeader = ({ num, title, description, isMobile }) => (
  <>
    {/* Séparateur */}
    <div
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        marginBottom: '2rem',
        paddingLeft:  isMobile ? '6%' : '15%',
        paddingRight: isMobile ? '6%' : '15%',
      }}
    >
      <div style={{ width: '100%', borderTop: '1px solid rgba(255,255,255,0.3)' }} />
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
        <span className="text-white text-base">+</span>
        <span className="text-white text-base">+</span>
      </div>
    </div>

    {/* Titre + description */}
    <div
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center',
        justifyContent: 'space-between',
        paddingLeft:  isMobile ? '6%' : '15%',
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
  </>
)

// ─── Sections 01 & 02 (grille de ProjectCard) ────────────────────────────────

const SectionGrid = ({ id, num, title, description, items, paddingTop = '4rem', isMobile }) => (
  <section id={id} style={{ paddingTop, backgroundColor: '#141414' }}>
    <SectionHeader num={num} title={title} description={description} isMobile={isMobile} />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: '1.5rem',
        paddingLeft:  isMobile ? '6%' : '15%',
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

// ─── Section 03 — Galerie (MasonryGallery) ────────────────────────────────────
// MasonryGallery gère son propre fond (#0e0e0e) et son padding interne.
// On surcharge ici uniquement le fond pour rester cohérent avec le reste de la page.

const SectionGalerie = ({ isMobile }) => (
  <section id="galerie" style={{ paddingTop: '0', backgroundColor: '#141414' }}>
    <div style={{ paddingTop: '0' }}>
      <SectionHeader
        num="03"
        title="GALERIE"
        description="Un condensé de nos plus belles photos."
        isMobile={isMobile}
      />
    </div>

    <div
      style={{
        paddingLeft:  isMobile ? '6%' : '15%',
        paddingRight: isMobile ? '6%' : '15%',
        paddingBottom: '4rem',
      }}
    >
      <Gallery items={GALERIE_MEDIA} />
    </div>
  </section>
)

// ─── Page Portfolio ───────────────────────────────────────────────────────────

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
            backgroundImage: "url('https://res.cloudinary.com/di0mcchgn/image/upload/f_auto,q_auto/compressed_portfolio_n6vmgu')",
            backgroundSize: 'cover',
            backgroundPosition: 'center 80%',
            backgroundAttachment: isMobile ? 'scroll' : 'fixed',
          }}
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Titre desktop */}
        {!isMobile && (
          <div
            className="relative z-10"
            style={{ paddingLeft: isMobile ? '6%' : '15%' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', height: isMobile ? 'auto' : '75vh', marginTop: isMobile ? '11.5rem' : 0 }}>
              <h1
                className="text-white uppercase"
                style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: isMobile ? '3rem' : '4.2rem', letterSpacing: '0.02em', lineHeight: 1.1 }}
              >
                DÉCOUVREZ<br />NOTRE UNIVERS.
              </h1>
            </div>
          </div>
        )}

        {/* Sommaire mobile */}
        {isMobile && (
          <div
            className="relative z-10"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.8rem', paddingLeft: '6%', paddingBottom: '2.5rem', marginTop: '3rem' }}
          >
            {CATEGORIES.map(({ num, label, anchor }) => (
              <a
                key={num}
                href={`#${anchor}`}
                className="flex items-center text-white hover:text-orange-400 transition-colors duration-200"
                style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.8rem', letterSpacing: '0.2em', gap: '1.5rem' }}
              >
                <span style={{ color: 'rgba(255,255,255,0.5)', minWidth: '1.5rem' }}>{num}</span>
                <span>{label}</span>
              </a>
            ))}
          </div>
        )}

        {/* Sommaire desktop */}
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
                style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1rem', letterSpacing: '0.2em', gap: '4rem', marginBottom: '1.5rem' }}
              >
                <span style={{ color: 'rgba(255,255,255,0.5)', minWidth: '2rem', textAlign: 'right' }}>{num}</span>
                <span style={{ minWidth: '260px', textAlign: 'right' }}>{label}</span>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* 01 — Collaborations */}
      <SectionGrid
        id="collaborations"
        num="01"
        title="COLLABORATIONS"
        description="Les projets réalisés pour nos clients."
        items={COLLABORATIONS}
        paddingTop="2rem"
        isMobile={isMobile}
      />

      {/* 02 — Histoires d'ailleurs */}
      <SectionGrid
        id="histoires"
        num="02"
        title="HISTOIRES D'AILLEURS"
        description="Nos plus beaux souvenirs autour du globe, racontés en image."
        items={HISTOIRES}
        paddingTop="0rem"
        isMobile={isMobile}
      />

      {/* 03 — Galerie (MasonryGallery) */}
      <SectionGalerie isMobile={isMobile} />

    </div>
  )
}
