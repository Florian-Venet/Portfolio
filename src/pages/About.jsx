import { useEffect, useRef } from 'react'

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

  // Snap quand on est à moins de 0.1% de la cible
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
    <div style={{ backgroundColor: '#141414'}}>
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
        </section>

      <div
        ref={wrapperRef}
        style={{ position: 'relative', zIndex: 10, height: '250vh' }}
      >
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

          <PersonSection
            name="VICTORIA"
            imgSrc="/public/vic.jpg"
            titleRef={vicTitleRef}
            descRef={vicDescRef}
          >
            <p>Victoria is a talented photographer capturing the essence of every moment. Her work explores light, shadow, and emotion in unique compositions.</p>
            <p style={{ marginTop: '1rem' }}>She specializes in portrait and landscape photography, blending natural elements with human storytelling to create timeless images.</p>
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
              imgSrc="/public/florian.jpg"
              titleRef={florTitleRef}
              descRef={florDescRef}
            >
              <p>Florian is a visionary director of photography with a keen eye for storytelling through movement and light.</p>
              <p style={{ marginTop: '1rem' }}>His work spans documentary and narrative film, always searching for the perfect frame that makes a scene unforgettable.</p>
            </PersonSection>
          </div>

        </div>
      </div>
    </div>
  )
}