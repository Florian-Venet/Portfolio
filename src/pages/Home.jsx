import Hero from '../components/Hero'
import Section from '../components/Section'

const SECTIONS = [
  {
    id: 'portfolio',
    label: 'PORTFOLIO',
    cloudinaryId: 'compressed_portfolio_n6vmgu',
    title: 'DÉCOUVREZ NOTRE UNIVERS.',
    cta: 'NOS RÉALISATIONS',
    mobileBackgroundPosition: '15% center',
  },
  {
    id: 'services',
    label: 'SERVICES',
    cloudinaryId: 'compressed_DSC02845_gz76oq',
    title: 'EXPLOREZ VOS POSSIBILITÉS.',
    cta: 'NOS OFFRES',
    mobileBackgroundPosition: '40% center',
  },
  {
    id: 'apropos',
    label: 'À PROPOS',
    cloudinaryId: 'compressed_apropos_xjfxax',
    title: 'DERRIÈRE LA CAMÉRA.',
    cta: 'QUI SOMMES NOUS ?',
    mobileBackgroundPosition: '50% center',

  },
  {
    id: 'contact',
    label: 'CONTACT',
    cloudinaryId: 'compressed_DSC03080_hjhd4j',
    title: 'DISCUTONS.',
    cta: 'NOUS CONTACTER',
    mobileBackgroundPosition: '65% center',
  },
]

export default function Home() {
  return (
    <>
      <Hero />
      {SECTIONS.map((section) => (
        <Section key={section.id} {...section} />
      ))}
    </>
  )
}