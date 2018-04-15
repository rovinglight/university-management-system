const mongoose = require('mongoose')
const config = require('../config/dev.js')

mongoose.connect(`mongodb://${config.mongoDB.host}:${config.mongoDB.port}/ums`)

mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open')
})

mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err)
})

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected')
})

module.exports = mongoose
