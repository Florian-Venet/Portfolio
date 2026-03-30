import { cloudinaryUrl } from '../utils/cloudinary'
import { useIsMobile } from '../hooks/useIsMobile'

function PersonSection({ name, imgSrc, children, isMobile, zIndex }) {
  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex,
      height: '100vh',
      backgroundColor: '#141414',
      overflow: 'hidden',
    }}>

      {/* Trait + + */}
      <div style={{
        position: 'absolute',
        top: '2rem',
        left: isMobile ? '6%' : '15%',
        right: isMobile ? '6%' : '15%',
        zIndex: 10,
      }}>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.3)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
          <span style={{ color: 'white' }}>+</span>
          <span style={{ color: 'white' }}>+</span>
        </div>
      </div>

      {isMobile ? (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', paddingTop: '3rem', paddingBottom: '3rem', gap: '1.5rem' }}>

    {/* Image verticale centrée */}
    <div style={{ position: 'relative', width: '60%', aspectRatio: '3/4', flexShrink: 0 }}>
      <img
        src={imgSrc}
        alt={name}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <h2 style={{
        position: 'absolute',
        bottom: '0.8rem',
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: '3rem',
        fontFamily: 'Bebas Neue, sans-serif',
        color: 'white',
        lineHeight: 1,
        zIndex: 2,
      }}>
        {name}
      </h2>
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 1 }} />
    </div>

    {/* Texte */}
    <div style={{
      paddingLeft: '6%',
      paddingRight: '6%',
      color: 'white',
      fontSize: '0.8rem',
      lineHeight: 1.8,
      overflowY: 'auto',
      fontFamily: 'Montserrat, sans-serif',
    }}>
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
              top: '12%',
              left: '15%',
              width: '25%',
              height: '76%',
              objectFit: 'cover',
              zIndex: 0,
            }}
          />
          <h2 style={{
            position: 'absolute',
            top: '8%',
            left: '32%',
            fontSize: '8rem',
            fontFamily: 'Bebas Neue, sans-serif',
            zIndex: 2,
            lineHeight: 1.1,
            color: 'white',
          }}>
            {name}
          </h2>
          <div style={{
            position: 'absolute',
            top: '32%',
            left: '63%',
            right: '15%',
            color: 'white',
            fontSize: '1rem',
            lineHeight: 1.8,
            zIndex: 2,
            fontFamily: 'Montserrat, sans-serif',
          }}>
            {children}
          </div>
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.2)', zIndex: 1 }} />
        </>
      )}
    </div>
  )
}

export default function About() {
  const isMobile = useIsMobile()

  return (
    <div style={{ backgroundColor: '#141414' }}>

      {/* Hero */}
      <section className="relative flex" style={{ height: '75vh', width: '100%' }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${cloudinaryUrl('compressed_apropos_xjfxax')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 110%',
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

      {/* Victoria + Florian — sticky comme Services */}
      <PersonSection name="VICTORIA" imgSrc={cloudinaryUrl('vic_gx82jw')} isMobile={isMobile} zIndex={1}>
        <p> Passionnée d'art et de création depuis toujours, mon regard s'attarde sur les détails les plus infimes. Ma pratique de la peinture a façonné ma manière de voir:  je décompose chaque scène pour me concentrer sur la lumière, les couleurs et les compositions, afin de créer des images à la fois esthétiques et vivantes. </p>
        <p style={{ marginTop: '1rem' }}>À travers la photographie et la vidéographie, je cherche à révéler les émotions et l'atmosphère de chaque instant, en mêlant sensibilité artistique et exigence visuelle.</p>

      </PersonSection>

      <PersonSection name="FLORIAN" imgSrc={cloudinaryUrl('florian_shovdw')} isMobile={isMobile} zIndex={2}>
        <p>Convaincu qu'une belle image fait la différence, j'aborde chaque projet avec une vision d'ensemble : de la direction artistique à la post-production, chaque détail compte.</p>
        <p style={{ marginTop: '1rem' }}>Photographe, vidéaste et pilote de drone, je travaille en étroite collaboration avec chaque client pour saisir ce qui rend son univers unique et le mettre en lumière avec précision. </p>
      </PersonSection>



    </div>
  )
}
