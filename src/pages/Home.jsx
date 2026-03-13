import Hero from '../components/Hero'
import Section from '../components/Section'

const SECTIONS = [
  {
    id: 'portfolio',
    label: 'PORTFOLIO',
    image: '/portfolio.jpg',
    title: 'DÉCOUVREZ NOTRE UNIVERS.',
    cta: 'NOS RÉALISATIONS',
  },
  {
    id: 'services',
    label: 'SERVICES',
    image: '/services.png',
    title: 'EXPLOREZ VOS POSSIBILITÉS.',
    cta: 'NOS OFFRES',
  },
  {
    id: 'apropos',
    label: 'À PROPOS',
    image: '/apropos.jpg',
    title: 'DERRIÈRE LA CAMÉRA.',
    cta: 'QUI SOMMES NOUS ?',
  },
  {
    id: 'contact',
    label: 'CONTACT',
    image: '/contact.jpg',
    title: 'DISCUTONS.',
    cta: 'NOUS CONTACTER',
  },
]

export default function Home() {
  return (
    <main>
      <Hero />
      {SECTIONS.map((section) => (
        <Section key={section.id} {...section} />
      ))}
    </main>
  )
}