export function priceFormatted (value) {
  if (!value) return 'Бесплатно'
  return (value).toLocaleString('ru') + ' ₽'
}
