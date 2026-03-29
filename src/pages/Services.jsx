import { useNavigate } from 'react-router-dom'
import { cloudinaryUrl } from '../utils/cloudinary'
import { useIsMobile } from '../hooks/useIsMobile'

const OFFRES = [
  {
    id: 'pack-contenu',
    num: '01',
    titre: 'PACK CONTENU',
    accroche: "VOTRE UNIVERS, PRÊT À L'EMPLOI.",
    description: `Photos et vidéos retouchées, prêtes à l'emploi.\n\nRéseaux sociaux, plateformes de réservation, supports de communication — chaque visuel est pensé pour votre audience et prêt à publier.`,
    techniques: 'Photographie & HDR · Drone · Vidéographie · Retouche',
    detail: 'Sur mesure · Selon vos besoins',
  },
  {
    id: 'video-promotionnelle',
    num: '02',
    titre: 'VIDÉO PROMOTIONNELLE',
    accroche: 'UNE HISTOIRE. UNE IMAGE. UN IMPACT.',
    description: `Format court ou long, vertical ou horizontal, cinématique ou dynamique — chaque vidéo est conçue pour sublimer vos lieux et vos expériences.`,
    techniques: 'Direction artistique · Tournage · Montage · Étalonnage ',
    detail: 'Sur mesure · Selon vos besoins',
  },
  {
    id: 'mini-documentaire',
    num: '03',
    titre: 'MINI DOCUMENTAIRE',
    accroche: "AU-DELÀ DE L'IMAGE.",
    description: ` Interviews, portraits, témoignages — donnez une voix à votre univers. Le format idéal pour vos films corporate, événementiels, touristiques.`,
    techniques: 'Interviews · Tournage · Montage · Étalonnage',
    detail: 'Sur mesure · Selon vos besoins',
  },
]

const CATEGORIES = [
  { num: '01', label: 'PACK CONTENU', anchor: 'pack-contenu' },
  { num: '02', label: 'VIDÉO PROMOTIONNELLE', anchor: 'video-promotionnelle' },
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
            backgroundImage:  `url(${cloudinaryUrl('compressed_DSC02845_gz76oq')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 125%',
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
          <div style={{ display: 'flex', alignItems: 'center', height: isMobile ? 'auto' : '75vh', marginTop: isMobile ? '11.5rem' : 0 }}>
            <h1
              className="text-white uppercase"
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: isMobile ? '3rem' : '4.2rem',
                letterSpacing: '0.02em',
                lineHeight: 1.1,
              }}
            >
              EXPLOREZ<br />VOS POSSIBILITÉS.
            </h1>
          </div>
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
              justifyContent: 'flex-start',
              paddingLeft: isMobile ? '6%' : '15%',
              paddingRight: isMobile ? '6%' : '15%',
              paddingTop: isMobile ? '2rem' : '2rem',
              paddingBottom: isMobile ? '2rem' : '0',
              marginBottom: isMobile ? '0' : '4rem',
            }}
          >
            {/* Trait + + */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.3)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                <span className="text-white">+</span>
                <span className="text-white">+</span>
              </div>
            </div>

            {/* Numéro + titre */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '3rem' }}>
              <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: isMobile ? '3rem' : '5rem', lineHeight: 1, color: 'rgba(255,255,255,0.2)' }}>
                {offre.num}
              </span>
              <span className="text-white uppercase" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: isMobile ? '2rem' : '3.5rem', lineHeight: 1 }}>
                {offre.titre}
              </span>
            </div>

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
                }}
              >
                {para}
              </p>
            ))}

            {/* Techniques */}
            <p
              className="text-white/60"
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.9rem', marginTop: '2rem' }}
            >
              {offre.techniques}
            </p>

            {/* Detail */}
            <p
              className="text-white/40"
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.8rem', letterSpacing: '0.2em', marginTop: '4rem' }}
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
          backgroundImage: `url(${cloudinaryUrl('DSC08470_mtf80d')})`,
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