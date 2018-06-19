const mongoose = require('mongoose')
const config = require('../config/dev.js')
const os = require('os')
let platform = os.platform()

if (process.env.ENV !== 'test') {
  let host = config.mongoDB.host

  if (platform === 'win32') {
    host = config.mongoDB.winHost
  }

  mongoose.connect(`mongodb://${host}:${config.mongoDB.port}/ums`)

  mongoose.connection.on('connected', function () {
      console.log('Mongoose connection open')
  })

  mongoose.connection.on('error',function (err) {
      console.log('Mongoose connection error: ' + err)
  })

  mongoose.connection.on('disconnected', function () {
      console.log('Mongoose connection disconnected')
  })

}
module.exports = mongoose
