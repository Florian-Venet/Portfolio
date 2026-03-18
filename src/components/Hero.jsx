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

export default function Hero() {
  const isMobile = useIsMobile()

  return (
    <section
      id="accueil"
      className="relative w-full h-screen flex flex-col overflow-hidden"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videoprez.mov" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center"
        style={{ padding: isMobile ? '0 5%' : '0 15%' }}
      >
        <h1
          className="text-white uppercase"
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: isMobile ? '2rem' : '3.1rem',
            letterSpacing: '0.02em',
            lineHeight: 1.3,
            marginBottom: '1.5rem',
          }}
        >
          L'ART DE METTRE EN IMAGE CE QUI VOUS REND UNIQUE.
        </h1>
        <a
          href="#portfolio"
          className="text-white text-sm tracking-widest transition-colors duration-200 hover:text-orange-400"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          [ DECOUVRIR ]
        </a>
      </div>
    </section>
  )
}