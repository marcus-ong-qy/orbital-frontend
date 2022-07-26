import { ItemListing } from '../store/marketplace/types'

/**
 * Syntax: `ItemListing[].sort(<this function name here>)`
 * @returns ItemListing array sorted by latest timeCreated first
 */
export const sortListingsByTime = (item1: ItemListing, item2: ItemListing) =>
  item2.timeCreated - item1.timeCreated

/**
 * Syntax: `ItemListing[].sort(<this function name here>)`
 * @returns ItemListing array sorted by `status` in this order: `offered, available, sold`, then by `timeCreated`
 */
export const sortListingsByOfferedFirst = (item1: ItemListing, item2: ItemListing) =>
  Number(item2.status === 'OFFERED') - Number(item1.status === 'OFFERED') ||
  Number(item2.status === 'AVAILABLE') - Number(item1.status === 'AVAILABLE') ||
  item2.timeCreated - item1.timeCreated

/**
 * Syntax: `ItemListing[].sort(<this function name here>)`
 * @returns ItemListing array sorted by `status` in this order: `available, offered, sold`, then by `timeCreated`
 */
export const sortListingsByAvailableFirst = (item1: ItemListing, item2: ItemListing) =>
  Number(item2.status === 'AVAILABLE') - Number(item1.status === 'AVAILABLE') ||
  Number(item2.status === 'OFFERED') - Number(item1.status === 'OFFERED') ||
  item2.timeCreated - item1.timeCreated

/**
 * Syntax: `ItemListing[].filter(<this function name here>)`
 * @returns ItemListing array with all `status === 'SOLD'` listings removed
 */
export const filterAvailableListings = (item: ItemListing) => item.status === 'AVAILABLE'
