import { useState } from 'react'
import { cloudinaryUrl } from '../utils/cloudinary'
import { useIsMobile } from '../hooks/useIsMobile'

export default function Contact() {
  const isMobile = useIsMobile()
  const bgExtra = '3rem' // élargissement du fond de chaque côté
  const [formData, setFormData] = useState({ prenom: '', nom: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!formData.prenom.trim()) newErrors.prenom = 'Le prénom est requis.'
    if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis.'
    if (!formData.email.trim()) newErrors.email = "L'email est requis."
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "L'email n'est pas valide."
    if (!formData.message.trim()) newErrors.message = 'Le message est requis.'
    return newErrors
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setSending(true)
    try {
      const response = await fetch('https://formspree.io/f/REMPLACE_PAR_TON_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) setSubmitted(true)
    } catch (err) {
      console.error(err)
    }
    setSending(false)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${cloudinaryUrl('compressed_DSC03080_hjhd4j')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: isMobile ? 'scroll' : 'fixed',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '6rem 6% 3rem' : '8rem 15% 4rem',
        position: 'relative',
      }}
    >
      <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.)', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '580px' }}>
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            marginLeft: isMobile ? 0 : `calc(-1 * ${bgExtra})`,
            marginRight: isMobile ? 0 : `calc(-1 * ${bgExtra})`,
            padding: isMobile ? '2rem 1.5rem' : `2rem calc(3rem + ${bgExtra})`,
            marginBottom: '1.5rem',
          }}
        >
        {/* Titre */}
        <h1
          className="text-white uppercase text-center"
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: isMobile ? '2.5rem' : '3.1rem',
            letterSpacing: '0.02em',
            lineHeight: 1,
            marginBottom: '0.6rem',
          }}
        >
          DISCUTONS.
        </h1>

        {/* Sous-titre */}
        <p
          className="text-white text-center"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: isMobile ? '0.75rem' : '0.85rem',
            letterSpacing: '0.05em',
            marginBottom: isMobile ? '3rem' : '3rem',
            lineHeight: 1.7,
          }}
        >
          Chaque projet est unique. Contactez-nous et imaginons des images à la hauteur de votre vision.
        </p>

        {submitted ? (
          <div
            className="text-white text-center"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.9rem',
              padding: '3rem',
              letterSpacing: '0.05em',
            }}
          >
            Message envoyé. Nous vous répondrons rapidement.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '0.8rem' : '1.2rem' }}>
            {/* Prénom + Nom */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
              <div>
                <label className="text-white/90" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', display: 'block', marginBottom: '0.3rem' }}>PRÉNOM *</label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: errors.prenom ? '1px solid #df3f34' : '1px solid rgba(255,255,255,0.15)',
                    padding: isMobile ? '0.5rem 0.75rem' : '0.75rem 1rem',
                    color: 'white',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                  placeholder="Votre prénom"
                />
                {errors.prenom && <span style={{ color: '#df3f34', fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', marginTop: '0.2rem', display: 'block' }}>{errors.prenom}</span>}
              </div>

              <div>
                <label className="text-white/90" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', display: 'block', marginBottom: '0.3rem' }}>NOM *</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: errors.nom ? '1px solid #df3f34' : '1px solid rgba(255,255,255,0.15)',
                    padding: isMobile ? '0.5rem 0.75rem' : '0.75rem 1rem',
                    color: 'white',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                  placeholder="Votre nom"
                />
                {errors.nom && <span style={{ color: '#df3f34', fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', marginTop: '0.2rem', display: 'block' }}>{errors.nom}</span>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-white/90" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', display: 'block', marginBottom: '0.3rem' }}>EMAIL *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: errors.email ? '1px solid #df3f34' : '1px solid rgba(255,255,255,0.15)',
                  padding: isMobile ? '0.5rem 0.75rem' : '0.75rem 1rem',
                  color: 'white',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.85rem',
                  outline: 'none',
                }}
                placeholder="votre@email.com"
              />
              {errors.email && <span style={{ color: '#df3f34', fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', marginTop: '0.2rem', display: 'block' }}>{errors.email}</span>}
            </div>

            {/* Message */}
            <div>
              <label className="text-white/90" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', display: 'block', marginBottom: '0.3rem' }}>MESSAGE *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={isMobile ? 4 : 5}
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: errors.message ? '1px solid #df3f34' : '1px solid rgba(255,255,255,0.15)',
                  padding: isMobile ? '0.5rem 0.75rem' : '0.75rem 1rem',
                  color: 'white',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.85rem',
                  outline: 'none',
                  resize: 'vertical',
                }}
                placeholder="Décrivez votre projet..."
              />
              {errors.message && <span style={{ color: '#df3f34', fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', marginTop: '0.2rem', display: 'block' }}>{errors.message}</span>}
            </div>

            {/* Bouton */}
            <button
              type="submit"
              disabled={sending}
              className="text-white hover:text-orange-400 transition-colors duration-200 tracking-widest"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.8rem',
                background: 'none',
                border: 'none',
                padding: isMobile ? '0.5rem' : '1rem',
                cursor: 'pointer',
                marginTop: '0.3rem',
                letterSpacing: '0.25em',
              }}
            >
              {sending ? 'ENVOI EN COURS...' : '[ ENVOYER ]'}
            </button>
          </form>
        )}

        </div> {/* fin du fond semi-transparent */}

        </div> {/* fin du container maxWidth: 580px */}

        <div
          style={{
            position: isMobile ? 'relative' : 'absolute',
            left: isMobile ? 'auto' : '7rem',
            bottom: isMobile ? 'auto' : '5rem',
            marginTop: isMobile ? '-1rem' : 0,
            marginLeft: isMobile ? '-8.5rem' : 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            zIndex: 1,
          }}
        >
          <p
            className="text-white/80"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: isMobile ? '0.65rem' : '0.8rem',
              letterSpacing: '0.1em',
              marginBottom: '0.6rem',
              textAlign: 'left',
              lineHeight: 1.4,
            }}
          >
            Vous préférez nous contacter <br />
            sur WhatsApp ?
          </p>

          <a href="https://wa.me/33649226181" target="_blank" rel="noreferrer">
            <img
              src="/wtp3.png"
              alt="WhatsApp"
              style={{ width: isMobile ? '28px' : '36px', height: isMobile ? '28px' : '36px', cursor: 'pointer' }}
            />
          </a>
        
      </div>
    </div>
  )
}