const BASE = 'https://res.cloudinary.com/di0mcchgn/image/upload'

export function cloudinaryUrl(publicId, width = null) {
  const transforms = width
    ? `f_auto,q_90,w_${width}`
    : 'f_auto,q_90'
  return `${BASE}/${transforms}/${publicId}`
}