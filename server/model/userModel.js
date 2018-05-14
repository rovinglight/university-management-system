const DB = require('../db/connect')
const mongoose = require('mongoose')

//记录用户信息的collection
const userSchema = new mongoose.Schema({
  'name': String,
  'pwd': String,
  'user': String,
  'gender': String,
  'lastLogin': Date,
  'sessionKey': String,
  'phoneNumber': String,
  'auth': [{
    'role': String,
    'groupId': String
  }],
  'birthDate': Date,
  'CIdNumber': String,
  'ethnic': String,
  'address': String,
  'bankNumber': String,
  'classId': String
})

const UserModel = DB.model('user', userSchema)

module.exports = UserModel
