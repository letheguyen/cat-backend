const URL_PUBLIC = {
  home: '/',
  home: '/home',
}

const URL_USER = {
  profile: '/profile',
}

const URL_ADMIN = {
  users: '/users',
}

const APP_URL = {
  ...URL_PUBLIC,
  ...URL_USER,
  ...URL_ADMIN,
  login: '/sign-in',
  signUp: '/sign-up',
  upload: '/upload',
}

module.exports = {
  URL_PUBLIC,
  URL_USER,
  URL_ADMIN,
  APP_URL,
}
