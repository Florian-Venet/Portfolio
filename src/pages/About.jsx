import { useEffect, useRef, useState } from 'react'
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

function PersonSection({ name, imgSrc, children, isMobile }) {
  return (
    <div style={{ position: 'absolute', inset: 0, backgroundColor: '#141414', overflow: 'hidden' }}>

      {isMobile ? (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', paddingTop: '3rem' }}>
          <div style={{ position: 'relative', width: '100%', height: '45%' }}>
            <img
              src={imgSrc}
              alt={name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <h1
              style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1.5rem',
                fontSize: '4.5rem',
                fontFamily: 'Bebas Neue, sans-serif',
                color: 'white',
                lineHeight: 1,
                zIndex: 2,
              }}
            >
              {name}
            </h1>
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.2)', zIndex: 1 }} />
          </div>
          <div
            style={{
              padding: '2rem 1.5rem',
              color: 'white',
              fontSize: '0.85rem',
              lineHeight: 1.8,
              overflowY: 'auto',
            }}
          >
            {children}
          </div>
        </div>
      ) : (
        <>
          <img
            src={imgSrc}
            alt={name}
            style={{
              position: 'absolute',
              top: '8%',
              left: '8%',
              width: '30%',
              height: '82%',
              objectFit: 'cover',
              zIndex: 0,
            }}
          />
          <h1
            style={{
              position: 'absolute',
              top: '8%',
              left: '28%',
              fontSize: '10rem',
              fontFamily: 'Bebas Neue, sans-serif',
              zIndex: 2,
              lineHeight: 1.1,
              color: 'white',
            }}
          >
            {name}
          </h1>
          <div
            style={{
              position: 'absolute',
              top: '32%',
              left: '65%',
              width: '27%',
              color: 'white',
              fontSize: '1.1rem',
              lineHeight: 1.6,
              zIndex: 2,
            }}
          >
            {children}
          </div>
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.2)', zIndex: 1 }} />
        </>
      )}
    </div>
  )
}

export default function About() {
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const wrapperRef = useRef(null)
  const florianSlideRef = useRef(null)
  const rafRef = useRef(null)

  const smooth = useRef({ florSlide: 100 })
  const target = useRef({ florSlide: 100 })

  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t

    const handleScroll = () => {
      if (!wrapperRef.current) return
      const wrapperTop = wrapperRef.current.offsetTop
      const wrapperH = wrapperRef.current.offsetHeight - window.innerHeight
      const scroll = window.pageYOffset
      const progress = Math.max(0, Math.min(1, (scroll - wrapperTop) / wrapperH))

      const slideProgress = Math.max(0, Math.min(1, (progress - 0.2) / 0.35))
      target.current.florSlide = 100 - slideProgress * 100
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    const tick = () => {
      const s = smooth.current
      const t = target.current

      if (Math.abs(s.florSlide - t.florSlide) < 0.1) {
        s.florSlide = t.florSlide
      } else {
        s.florSlide = lerp(s.florSlide, t.florSlide, 0.07)
      }

      if (florianSlideRef.current) florianSlideRef.current.style.transform = `translateY(${s.florSlide}%)`

      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div style={{ backgroundColor: '#141414' }}>

      {/* Hero */}
      <section className="relative flex" style={{ height: '75vh', width: '100%' }}>
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
        <div
          className="relative z-10 flex items-center flex-1"
          style={{ paddingLeft: isMobile ? '6%' : '15%' }}
        >
          <h1
            className="text-white uppercase"
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: isMobile ? '3rem' : '4.2rem',
              letterSpacing: '0.02em',
              lineHeight: 1.1,
            }}
          >
            DERRIÈRE<br />LA CAMÉRA.
          </h1>
        </div>
      </section>

      {/* Sections Victoria + Florian */}
      <div
        ref={wrapperRef}
        style={{ position: 'relative', zIndex: 10, height: isMobile ? '300vh' : '200vh' }}
      >
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

          <PersonSection name="VICTORIA" imgSrc="/vic.jpg" isMobile={isMobile}>
            <p>Victoria est une photographe talentueuse qui capture l'essence de chaque moment. Son travail explore la lumière, l'ombre et l'émotion à travers des compositions uniques.</p>
            <p style={{ marginTop: '1rem' }}>Spécialisée en portrait et paysage, elle mêle éléments naturels et narration humaine pour créer des images intemporelles.</p>
          </PersonSection>

          <div
            ref={florianSlideRef}
            style={{
              position: 'absolute',
              inset: 0,
              willChange: 'transform',
              transform: 'translateY(100%)',
              zIndex: 10,
            }}
          >
            <PersonSection name="FLORIAN" imgSrc="/florian.jpeg" isMobile={isMobile}>
              <p>Derrière chaque image, il y a une intention. Mon travail consiste à révéler ce qui rend un lieu, une expérience ou une marque véritablement unique — et à le traduire en visuels qui font ressentir avant de faire voir.</p>
              <p style={{ marginTop: '1rem' }}>Photographe, vidéaste et pilote de drone, j'aborde chaque projet avec une vision d'ensemble : de la direction artistique à la post-production, chaque détail compte. Parce qu'une image bien faite, c'est une image qui reste.</p>
            </PersonSection>
          </div>

        </div>
      </div>

      {/* Section contact */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
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
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: isMobile ? '2.5rem' : '3.5rem',
              letterSpacing: '0.02em',
              marginBottom: '1rem',
            }}
          >
            DISCUTONS.
          </h2>
          <p
            className="text-white"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: isMobile ? '0.85rem' : '1rem',
              lineHeight: 1.8,
              marginBottom: '2.5rem',
            }}
          >
            Chaque projet est unique. Contactez-nous et imaginons des images à la hauteur de votre vision.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="text-white hover:text-orange-400 transition-colors duration-200 tracking-widest"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.8rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '0.25em',
            }}
          >
            [ NOUS CONTACTER ]
          </button>
        </div>
      </div>

    </div>
  )
}