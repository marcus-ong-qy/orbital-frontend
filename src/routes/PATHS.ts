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

  //MARKETPLACE
  MAIN = '/',
  SEARCH = '/marketplace/search',
  SEARCH_ID = '/marketplace/search/:searchText',
  ITEM = '/marketplace/item',
  ITEM_ID = '/marketplace/item/:itemId',
  DEAL = '/marketplace/item/deal',
  DEAL_ID = '/marketplaceitem/deal/:itemId',
  CHAT = '/marketplace/chat',
  UPLOAD_LISTING = '/marketplace/list',
}
