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
  Number(item2.status === 'offered') - Number(item1.status === 'offered') ||
  Number(item2.status === 'available') - Number(item1.status === 'available') ||
  item2.timeCreated - item1.timeCreated

/**
 * Syntax: `ItemListing[].sort(<this function name here>)`
 * @returns ItemListing array sorted by `status` in this order: `available, offered, sold`, then by `timeCreated`
 */
export const sortListingsByAvailableFirst = (item1: ItemListing, item2: ItemListing) =>
  Number(item2.status === 'available') - Number(item1.status === 'available') ||
  Number(item2.status === 'offered') - Number(item1.status === 'offered') ||
  item2.timeCreated - item1.timeCreated

/**
 * Syntax: `ItemListing[].filter(<this function name here>)`
 * @returns ItemListing array with all `status === 'sold'` listings removed
 */
export const filterAvailableListings = (item: ItemListing) =>
  item.status !== 'sold' && item.status !== ('Sold' as any)
