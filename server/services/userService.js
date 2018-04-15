const axios = require('axios')
const UserModel = require('../model/userModel')

module.exports = {
  searchByNamePwd : (userName, pwd) => {
    return new Promise ((resolve, reject) => {
      UserModel.findOne({
        name: userName,
        pwd: pwd
      }).then((user) => {
        if (!user || user.length === 0) {
          return reject('User not found')
        }
        resolve(user)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}
