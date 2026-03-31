'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'
import { PROJETS } from '../data/projets'
import Gallery from '../components/Gallery'
import { useIsMobile } from '../hooks/useIsMobile'

export default function Projet() {
  const params = useParams()
  const id = params?.id
  const router = useRouter()
  const projet = id ? PROJETS[id] : null
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!projet) {
    return (
      <div style={{ backgroundColor: '#141414', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>Projet introuvable.</p>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#141414', minHeight: '100vh' }}>

      {/* Bouton retour — portal pour dépasser le stacking context de <main> */}
      {typeof document !== 'undefined' && createPortal(
        <div style={{ position: 'fixed', top: '5rem', left: '5%', zIndex: 100 }}>
          <button
            onClick={() => router.push('/portfolio')}
            className="text-white hover:text-orange-400 transition-colors duration-200 tracking-widest"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.75rem', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ← RETOUR
          </button>
        </div>,
        document.body
      )}

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
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ display: 'block', border: 'none' }}
          />
        </div>
      </section>

      {/* Galerie */}
      <section
        style={{
          paddingLeft:  isMobile ? '6%' : '15%',
          paddingRight: isMobile ? '6%' : '15%',
          paddingBottom: '3rem',
        }}
      >
        <Gallery items={projet.galerie} />
      </section>

      {/* Bouton retour portfolio */}
      <div style={{ textAlign: 'center', paddingBottom: '6rem' }}>
        <button
          onClick={() => router.push('/portfolio')}
          className="text-white hover:text-orange-400 transition-colors duration-200 tracking-widest text-sm"
          style={{ fontFamily: 'Montserrat, sans-serif', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          [ DÉCOUVRIR LES AUTRES PROJETS ]
        </button>
      </div>

    </div>
  )
}
