import Hero from '../components/Hero'
import Section from '../components/Section'

const SECTIONS = [
  {
    id: 'portfolio',
    label: 'PORTFOLIO',
    cloudinaryId: 'compressed_portfolio_n6vmgu',
    title: 'DÉCOUVREZ NOTRE UNIVERS.',
    cta: 'NOS RÉALISATIONS',
  },
  {
    id: 'services',
    label: 'SERVICES',
    cloudinaryId: 'compressed_DSC02845_gz76oq',
    title: 'EXPLOREZ VOS POSSIBILITÉS.',
    cta: 'NOS OFFRES',
  },
  {
    id: 'apropos',
    label: 'À PROPOS',
    cloudinaryId: 'compressed_apropos_xjfxax',
    title: 'DERRIÈRE LA CAMÉRA.',
    cta: 'QUI SOMMES NOUS ?',
  },
  {
    id: 'contact',
    label: 'CONTACT',
    cloudinaryId: 'compressed_contact_f1bqp2',
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