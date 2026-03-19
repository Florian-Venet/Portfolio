import { useParams, useNavigate } from 'react-router-dom'
import { PROJETS } from '../data/projets'
import { useState, useEffect } from 'react'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isMobile
}

export default function Projet() {
  const { id } = useParams()
  const navigate = useNavigate()
  const projet = PROJETS[id]
  const isMobile = useIsMobile()

  if (!projet) {
    return (
      <div style={{ backgroundColor: '#141414', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>Projet introuvable.</p>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#141414', minHeight: '100vh' }}>

      {/* Bouton retour */}
      <div style={{ position: 'fixed', top: '5rem', left: '5%', zIndex: 10 }}>
        <button
          onClick={() => navigate('/portfolio')}
          className="text-white hover:text-orange-400 transition-colors duration-200 tracking-widest"
          style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.75rem', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          ← RETOUR
        </button>
      </div>

      {/* Section principale */}
      <section
        style={{
          paddingTop: '8rem',
          paddingBottom: '3rem',
          paddingLeft: isMobile ? '6%' : '15%',
          paddingRight: isMobile ? '6%' : '15%',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '2rem' : '5%',
          alignItems: 'flex-start',
        }}
      >
        {/* Texte — en haut sur mobile, à droite sur desktop */}
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '1rem', order: isMobile ? 1 : 2 }}>
          <h1
            className="text-white"
            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: isMobile ? '2.2rem' : '2.8rem', letterSpacing: '0.02em', lineHeight: 1 }}
          >
            {projet.titre}
          </h1>
          <p
            className="text-white/50"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.85rem', letterSpacing: '0.15em' }}
          >
            {projet.sousTitre}
          </p>
          <div style={{ marginTop: '1rem' }}>
            {projet.description.split('\n\n').map((para, i) => (
              <p
                key={i}
                className="text-white"
                style={{ fontFamily: 'Montserrat, sans-serif', fontSize: isMobile ? '0.85rem' : '0.9rem', lineHeight: 1.8, marginBottom: '1.2rem' }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Vidéo — en bas sur mobile, à gauche sur desktop */}
        <div style={{ flex: isMobile ? 'none' : '1.2', width: isMobile ? '100%' : undefined, aspectRatio: '16/9', order: isMobile ? 2 : 1 }}>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${projet.videoYoutube}`}
            title={projet.titre}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ display: 'block' }}
          />
        </div>
      </section>

      {/* Galerie */}
      <section
        style={{
          paddingLeft: isMobile ? '6%' : '15%',
          paddingRight: isMobile ? '6%' : '15%',
          paddingBottom: '3rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '0.5rem',
          }}
        >
          {projet.galerie.map((item, i) => (
            <div
              key={i}
              style={{
                height: isMobile ? '220px' : '280px',
                backgroundImage: item.type === 'photo' ? `url(${item.src})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: item.type === 'video' ? '#000' : undefined,
              }}
            >
              {item.type === 'video' && (
                <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                  <source src={item.src} type="video/mp4" />
                </video>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bouton retour portfolio */}
      <div style={{ textAlign: 'center', paddingBottom: '6rem' }}>
        <button
          onClick={() => navigate('/portfolio')}
          className="text-white hover:text-orange-400 transition-colors duration-200 tracking-widest text-sm"
          style={{ fontFamily: 'Montserrat, sans-serif', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          [ DÉCOUVRIR LES AUTRES PROJETS ]
        </button>
      </div>

    </div>
  )
}