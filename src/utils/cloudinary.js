const BASE = 'https://res.cloudinary.com/di0mcchgn/image/upload'

export function cloudinaryUrl(publicId, width = null) {
  const transforms = width
    ? `f_auto,q_auto,w_${width}`
    : 'f_auto,q_auto'
  return `${BASE}/${transforms}/${publicId}`
}