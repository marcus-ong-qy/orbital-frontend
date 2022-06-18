import { MONTHS } from './dates'

/**
 *
 * @param unixDate epoch/unix date time number
 * @returns time in the form of (dd month yyyy) (eg, 27 April 2022)
 */

const unixToFullDate = (unixDate: number) => {
  const date = new Date(unixDate * 1000)
  const month = date.getMonth()
  const day = date.getDate()
  const year = date.getFullYear()

  return `${day} ${MONTHS[month]} ${year}`
}

export default unixToFullDate
