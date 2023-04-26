const URL_PUBLIC = {
  home: '/',
  home: '/home',
}

const URL_USER = {
  profile: '/profile',
}

const URL_ADMIN = {
  users: 'admin/',
}

const APP_URL = {
  ...URL_PUBLIC,
  ...URL_USER,
  ...URL_ADMIN,
  login: '/login'
}

module.exports = {
  URL_PUBLIC,
  URL_USER,
  URL_ADMIN,
  APP_URL,
}
