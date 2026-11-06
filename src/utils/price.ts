const CURRENCY = 'USD' // change in one place when the team decides

export const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: CURRENCY, maximumFractionDigits: 0 }).format(value)

export const getFinalPrice = (basePrice: number, offerPercent?: number) =>
  offerPercent ? basePrice * (1 - offerPercent / 100) : basePrice