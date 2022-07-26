/**
 *
 * Converts ANY text to Capital Case e.g. `'SELL'` -> `'Sell'`, `'rent'` -> `'Rent'`
 * @param text text to convert
 * @returns converted text
 */

const toCapitalCase = (text: string) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()

export default toCapitalCase
