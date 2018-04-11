const axios = require('axios')
const UserModel = require('../model/userModel')

module.exports = {
  searchByNamePwd : async (userName, pwd) => {
    return new Promise ((resolve, reject) => {
      console.log(userName)
      console.log(pwd)
      UserModel.findOne({
        name: userName,
        pwd: pwd
      }).then((user) => {
        resolve(user)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  insertUser : async (userName, pwd) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: 'https://api.bmob.cn/1/classes/User_Rank',
        data: {
          user: userName,
          pwd: pwd,
          total: 0,
          correct: 0
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        resolve(res.data)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  update : async (userId, param) => {
    console.log(userId)
    console.log(param)
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: `https://api.bmob.cn/1/classes/User_Rank/${userId}`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: param
      }).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}
