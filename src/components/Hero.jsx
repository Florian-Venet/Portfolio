export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative w-full h-screen flex flex-col overflow-hidden"
    >
      {/* Vidéo en arrière-plan */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videoprez.mov" type="video/mp4" />
      </video>

      {/* Overlay sombre 19% */}
      <div className="absolute inset-0 bg-black/19" />

      {/* Contenu */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1
          className="text-white uppercase"
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '3.1rem',
            letterSpacing: '0.02em',
            lineHeight: 1,
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