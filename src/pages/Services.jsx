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

const OFFRES = [
  {
    id: 'pack-contenu',
    num: '01',
    titre: 'PACK CONTENU',
    accroche: "VOTRE UNIVERS, PRÊT À L'EMPLOI.",
    description: `Photos et vidéos brutes retouchées, livrées clé en main.\n\nRéseaux sociaux, plateformes de réservation, supports de communication — chaque visuel est pensé pour votre audience et prêt à publier.`,
    detail: 'Sur mesure · Selon vos besoins',
  },
  {
    id: 'video-montee',
    num: '02',
    titre: 'VIDÉO MONTÉE',
    accroche: 'UNE HISTOIRE. UNE IMAGE. UN IMPACT.',
    description: `De la captation au montage final.\n\nFormat court ou long, vertical ou horizontal, cinématique ou dynamique. Chaque vidéo est conçue pour votre plateforme et votre vision.`,
    detail: 'Sur mesure · Selon vos besoins',
  },
  {
    id: 'mini-documentaire',
    num: '03',
    titre: 'MINI DOCUMENTAIRE',
    accroche: "AU-DELÀ DE L'IMAGE.",
    description: `Le format premium pour raconter une vraie histoire.\n\nNarration, interviews, immersion complète. Pour les marques qui veulent laisser une empreinte durable dans l'esprit de leur audience.`,
    detail: 'Sur mesure · Selon vos besoins',
  },
]

const CATEGORIES = [
  { num: '01', label: 'PACK CONTENU', anchor: 'pack-contenu' },
  { num: '02', label: 'VIDÉO MONTÉE', anchor: 'video-montee' },
  { num: '03', label: 'MINI DOCUMENTAIRE', anchor: 'mini-documentaire' },
]

export default function Services() {
  const navigate = useNavigate()
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
            backgroundImage: "url('/service.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center 100%',
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
                EXPLOREZ<br />VOS POSSIBILITÉS.
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
              EXPLOREZ<br />VOS POSSIBILITÉS.
            </h1>
          )}
        </div>

        {/* Sommaire mobile */}
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

      {/* Sections sticky */}
      <div>
        {OFFRES.map((offre, index) => (
          <div
            key={offre.id}
            id={offre.id}
            style={{
              position: 'sticky',
              top: 0,
              zIndex: index + 1,
              backgroundColor: '#141414',
              height: isMobile ? 'auto' : '55vh',
              minHeight: isMobile ? 'auto' : undefined,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingLeft: isMobile ? '6%' : '15%',
              paddingRight: isMobile ? '6%' : '15%',
              paddingTop: isMobile ? '2rem' : '0',
              paddingBottom: isMobile ? '2rem' : '0',
              marginBottom: isMobile ? '0' : '4rem',
            }}
          >
            {/* Trait + + */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                <span className="text-white">+</span>
                <span className="text-white">+</span>
              </div>
            </div>

            {/* Numéro + titre */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '1rem' }}>
              <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: isMobile ? '3rem' : '5rem', lineHeight: 1, color: 'rgba(255,255,255,0.2)' }}>
                {offre.num}
              </span>
              <span className="text-white uppercase" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: isMobile ? '2rem' : '3.5rem', lineHeight: 1 }}>
                {offre.titre}
              </span>
            </div>

            {/* Accroche */}
            <h2
              className="text-white uppercase"
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: isMobile ? '1.3rem' : '2rem',
                letterSpacing: '0.05em',
                marginBottom: '1rem',
                marginTop: isMobile ? '0.5rem' : '1.5rem',
              }}
            >
              {offre.accroche}
            </h2>

            {/* Description */}
            {offre.description.split('\n\n').map((para, i) => (
              <p
                key={i}
                className="text-white/70"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: isMobile ? '0.85rem' : '0.9rem',
                  lineHeight: 1.9,
                  marginBottom: '0.5rem',
                  maxWidth: '600px',
                }}
              >
                {para}
              </p>
            ))}

            {/* Detail */}
            <p
              className="text-white/50"
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.8rem', letterSpacing: '0.2em', marginTop: '1rem' }}
            >
              {offre.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Section contact */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: OFFRES.length + 1,
          backgroundImage: "url('/contact.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 65%',
          backgroundAttachment: isMobile ? 'scroll' : 'fixed',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: isMobile ? '4rem 6%' : '4rem 15%',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.2)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2
            className="text-white uppercase"
            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: isMobile ? '2.5rem' : '3.5rem', letterSpacing: '0.02em', marginBottom: '1rem' }}
          >
            DISCUTONS.
          </h2>
          <p
            className="text-white"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: isMobile ? '0.85rem' : '1rem', lineHeight: 1.8, marginBottom: '2.5rem' }}
          >
            Chaque projet est unique. Contactez-nous et imaginons des images à la hauteur de votre vision.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="text-white hover:text-orange-400 transition-colors duration-200 tracking-widest"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.8rem', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.25em' }}
          >
            [ NOUS CONTACTER ]
          </button>
        </div>
      </div>

    </div>
  )
}