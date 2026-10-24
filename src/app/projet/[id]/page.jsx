import { PROJETS } from '../../../data/projets'

export { default } from '../../../pages/Projet'

export async function generateMetadata({ params }) {
  const { id } = await params
  const projet = PROJETS[id]

  if (!projet) {
    return {
      title: 'Projet introuvable | ELØRIA Studio',
      description: 'Projet introuvable.',
    }
  }

  if (id === 'relai-valdieu') {
    return {
      title: 'Relai Valdieu — Maison d’hôtes dans le Perche | ELØRIA Studio',
      description: 'Découvrez le projet photo et vidéo réalisé par ELØRIA Studio pour Relai Valdieu, une maison d’hôtes au cœur des paysages vallonnés du Perche.',
    }
  }

  return {
    title: `${projet.titre} | ELØRIA Studio`,
    description: projet.description.replace(/\n+/g, ' ').trim().slice(0, 160),
  }
}
