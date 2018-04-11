const mongoose = require('mongoose')
const config = require('../config/dev.js')

mongoose.connect(`mongodb://${config.mongoDB.user}:${config.mongoDB.pwd}@${config.mongoDB.host}:${config.mongoDB.port}/ums`)

module.exports = mongoose
