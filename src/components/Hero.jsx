import { useIsMobile } from '../hooks/useIsMobile'

export default function Hero() {
  const isMobile = useIsMobile()

  return (
    <section
      id="accueil"
      className="relative w-full h-screen flex flex-col overflow-hidden"
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <iframe
          src="https://player.vimeo.com/video/1178262213?autoplay=1&loop=1&muted=1&background=1"
          className="absolute w-full h-full"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', minWidth: '100%', minHeight: '100%', width: 'auto', height: 'auto', aspectRatio: '16/9' }}

          allow="autoplay; fullscreen; picture-in-picture"
          title="Hero video"
        />
      </div>

      <div className="absolute inset-0 bg-black/35" />

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