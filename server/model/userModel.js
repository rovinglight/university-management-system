const DB = require('../db/connect')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  'name': String,
  'pwd': String,
  'role': String,
  'lastLogin': Date,
  'sessionKey': String,
  'auth': [{
    'role': String,
    'groupId': String
  }]
})

const UserModel = DB.model('user', userSchema)

module.exports = UserModel
