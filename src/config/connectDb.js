const mongoose = require('mongoose')

module.exports = () => {
  mongoose.set('strictQuery', false)
  mongoose.connect(String(process.env.MONGODB_URI))

  mongoose.connection
    .once('open', () => {
      console.log('Connection successfully !')
    })
    .on('err', (error) => {
      console.error('Unable to connect to the database:', error)
    })
}
