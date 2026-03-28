import { useNavigate } from 'react-router-dom'
import { cloudinaryUrl } from '../utils/cloudinary'

export default function Section({ id, label, cloudinaryId, image, title, cta }) {
  const navigate = useNavigate()
    const bgImage = cloudinaryId ? cloudinaryUrl(cloudinaryId) : image


  return (
    <section
      id={id}
      className="relative w-full h-screen flex flex-col"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* reste du composant inchangé */}
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative z-10 flex flex-col items-center" style={{ paddingTop: '1cm' }}>
        
        {/* Trait */}
        <div className="w-4/5 border-t border-white/50" />

        {/* Ligne + label + */}
        <div className="flex justify-between items-center w-4/5 mt-2">
          <span className="text-white text-base">+</span>

          <span
            className="text-white text-xs tracking-[0.4em]"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {label}
          </span>

          <span className="text-white text-base">+</span>
        </div>

      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4">
        <h2
          className="text-white uppercase mb-10"
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '3.1rem',
            letterSpacing: '0.02em',
            lineHeight: 1,
            marginBottom: '1.5rem',
          }}
        >
          {title}
        </h2>

        

        <button
          onClick={() => navigate(`/${id}`)}
          className="text-white text-sm tracking-widest transition-colors duration-200 hover:text-orange-400"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          [ {cta} ]
        </button>
      </div>
    </section>
  )
}