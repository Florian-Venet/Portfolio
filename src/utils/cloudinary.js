const BASE = 'https://res.cloudinary.com/di0mcchgn/image/upload'

export function cloudinaryUrl(publicId, width = null) {
  const transforms = width
    ? `f_auto,q_60,w_${width}`   // qualité fixe pour les aperçus
    : 'f_auto,q_auto'
  return `${BASE}/${transforms}/${publicId}`
}