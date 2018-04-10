const axios = require('axios')

module.exports = {
  searchByUserName : async (userName) => {
    return new Promise ((resolve, reject) => {
      axios.get(`https://api.bmob.cn/1/classes/User_Rank/`, {
        params: {
          where: JSON.stringify({user: userName})
        }
      }).then((res) => {
        resolve(res.data)
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
