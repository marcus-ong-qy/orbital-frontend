export const TIMEOUT = 5000
export const BASE_URL = 'https://asia-southeast1-orbital2-4105d.cloudfunctions.net'

export enum TYPE {
  GET_ITEM_BY_ID = 'getItemById',
  FILTER_AND_SEARCH = 'filterAndSearch',
}

export enum ENDPOINTS {
  HOME = '/home',
  USER = '/user',
  ITEM = '/item',
  RESERVATION = '/reservation',
  TRANSACTION = '/transaction',
}
