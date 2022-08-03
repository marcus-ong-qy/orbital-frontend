export enum PATHS {
  // AUTENTICATION
  LOGIN = '/auth/login',
  COMMUNITY = '/auth/community',
  REGISTER = '/auth/register',
  FORGET_PASSWORD = '/auth/forget',

  // SETTINGS
  USER_PROFILE = '/settings/user', // TODO add user id
  EDIT_USER_PROFILE = '/settings/user/edit',
  USER_LISTINGS = '/settings/my-listings',
  USER_ORDERS = '/settings/my-orders',

  //MARKETPLACE
  MAIN = '/',
  SEARCH = '/marketplace/search',
  SEARCH_ID = '/marketplace/search/:searchText',
  ITEM = '/marketplace/item',
  ITEM_ID = '/marketplace/item/:itemId',
  EDIT_ITEM = '/marketplace/item/edit',
  EDIT_ITEM_ID = '/marketplace/item/edit/:itemId',
  DEAL = '/marketplace/item/deal',
  DEAL_ID = '/marketplace/item/deal/:itemId',
  CHAT = '/marketplace/chat',
  CHAT_ID = '/marketplace/chat/:chatUID',
  UPLOAD_LISTING = '/marketplace/upload',
  UPLOAD_LISTING_ID = '/marketplace/upload/:listingType',
}
