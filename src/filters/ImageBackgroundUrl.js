import CatDefault from '@/assets/images/cat--undefined.jpg'

export function imageBackgroundUrl (value) {
  if (!value) return `background-image: url(${CatDefault})`
  return `background-image: url(${value})`
}
