import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function PersonSection({ name, imgSrc, children, titleRef, descRef }) {
  return (
    <div style={{ position: 'absolute', inset: 0, backgroundColor: '#141414', overflow: 'hidden' }}>
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
        ref={titleRef}
        style={{
          position: 'absolute',
          top: '8%',
          left: '28%',
          fontSize: '10rem',
          fontFamily: 'Bebas Neue, sans-serif',
          zIndex: 2,
          lineHeight: 1.1,
          color: 'white',
          willChange: 'transform',
        }}
      >
        {name}
      </h1>
      <div
        ref={descRef}
        style={{
          position: 'absolute',
          top: '32%',
          left: '65%',
          width: '27%',
          color: 'white',
          fontSize: '1.1rem',
          lineHeight: 1.6,
          zIndex: 2,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.2)', zIndex: 1 }} />
    </div>
  )
}

export default function About() {
  const navigate = useNavigate()
  const wrapperRef = useRef(null)
  const florianSlideRef = useRef(null)
  const vicTitleRef = useRef(null)
  const vicDescRef = useRef(null)
  const florTitleRef = useRef(null)
  const florDescRef = useRef(null)
  const rafRef = useRef(null)

  const smooth = useRef({ vicTitle: 0, vicDesc: 0, florTitle: 0, florDesc: 0, florSlide: 100 })
  const target = useRef({ vicTitle: 0, vicDesc: 0, florTitle: 0, florDesc: 0, florSlide: 100 })

  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t

    const handleScroll = () => {
      if (!wrapperRef.current) return
      const wrapperTop = wrapperRef.current.offsetTop
      const wrapperH = wrapperRef.current.offsetHeight - window.innerHeight
      const scroll = window.pageYOffset
      const progress = Math.max(0, Math.min(1, (scroll - wrapperTop) / wrapperH))

      const vicOffset = Math.max(0, scroll - wrapperTop)
      target.current.vicTitle = Math.min(vicOffset * 0.04, 20)
      target.current.vicDesc  = Math.min(vicOffset * 0.025, 12)

      const slideProgress = Math.max(0, Math.min(1, (progress - 0.2) / 0.35))
      target.current.florSlide = 100 - slideProgress * 100

      const florOffset = Math.max(0, scroll - (wrapperTop + wrapperH * 0.2))
      target.current.florTitle = Math.min(florOffset * 0.04, 20)
      target.current.florDesc  = Math.min(florOffset * 0.025, 12)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    const tick = () => {
      const s = smooth.current
      const t = target.current

      s.vicTitle  = lerp(s.vicTitle,  t.vicTitle,  0.07)
      s.vicDesc   = lerp(s.vicDesc,   t.vicDesc,   0.07)
      s.florTitle = lerp(s.florTitle, t.florTitle, 0.07)
      s.florDesc  = lerp(s.florDesc,  t.florDesc,  0.07)

      if (Math.abs(s.florSlide - t.florSlide) < 0.1) {
        s.florSlide = t.florSlide
      } else {
        s.florSlide = lerp(s.florSlide, t.florSlide, 0.07)
      }

      if (vicTitleRef.current)     vicTitleRef.current.style.transform     = `translateY(${s.vicTitle}px)`
      if (vicDescRef.current)      vicDescRef.current.style.transform      = `translateY(${s.vicDesc}px)`
      if (florTitleRef.current)    florTitleRef.current.style.transform    = `translateY(${s.florTitle}px)`
      if (florDescRef.current)     florDescRef.current.style.transform     = `translateY(${s.florDesc}px)`
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
            DERRIÈRE<br />LA CAMÉRA.
          </h1>
        </div>
      </section>

      {/* Sections Victoria + Florian */}
      <div
        ref={wrapperRef}
        style={{ position: 'relative', zIndex: 10, height: '200vh' }}
      >
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

          <PersonSection
            name="VICTORIA"
            imgSrc="/vic.jpg"
            titleRef={vicTitleRef}
            descRef={vicDescRef}
          >
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
            <PersonSection
              name="FLORIAN"
              imgSrc="/florian.jpeg"
              titleRef={florTitleRef}
              descRef={florDescRef}
            >
              <p>Florian est un directeur de la photographie visionnaire avec un sens aigu de la narration par le mouvement et la lumière.</p>
              <p style={{ marginTop: '1rem' }}>Son travail couvre le documentaire et le cinéma narratif, toujours à la recherche du cadre parfait qui rend une scène inoubliable.</p>
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
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '4rem 15%',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.2)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2
            className="text-white uppercase"
            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '3.5rem', letterSpacing: '0.02em', marginBottom: '1rem' }}
          >
            DISCUTONS.
          </h2>
          <p
            className="text-white"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2.5rem' }}
          >
            Chaque projet est unique. Contactez-nous et imaginons des images à la hauteur de votre vision.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="text-white hover:text-orange-400 transition-colors duration-200 tracking-widest"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.8rem', background: 'none', border: '1px solid rgba(255,255,255,0.3)', padding: '1rem 2rem', cursor: 'pointer', letterSpacing: '0.25em' }}
          >
            [ NOUS CONTACTER ]
          </button>
        </div>
      </div>

    </div>
  )
}