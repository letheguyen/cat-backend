const URL_PUBLIC = {
  home: '/',
  home: '/home',
}

const URL_USER = {
  profile: '/profile',
  getShopInfo: '/shop-info',
  rommChat: '/chat-room',
  detailRommChat: '/chat-room/:id',
}

const URL_ADMIN = {
  users: '/users',
  product: '/product',
  categorys: '/categorys',
  categorysDetail: '/categorys/:id',
  shopInformation: '/shop-infomation',
}

const APP_URL = {
  ...URL_PUBLIC,
  ...URL_USER,
  ...URL_ADMIN,
  login: '/sign-in',
  signUp: '/sign-up',
  upload: '/upload',
  signInSNS: '/sign-in-sns',
}

module.exports = {
  URL_PUBLIC,
  URL_USER,
  URL_ADMIN,
  APP_URL,
}
