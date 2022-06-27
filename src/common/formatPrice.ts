/**
 *
 * @param price number
 * @returns price string formatted to 2 decimal places
 */

const formatPrice = (price: number | undefined) => price?.toFixed(2) ?? '-'

export default formatPrice
