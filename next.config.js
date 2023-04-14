const { parsed: localEnv } = require('dotenv').config()

module.exports = {
  reactStrictMode: true,
  env: {
    DB_HOST: localEnv.DB_HOST
  }
}
