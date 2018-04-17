const axios = require('axios')
const SgroupModel = require('../model/sgroupModel')
const mongoose = require('mongoose')

module.exports = {
  getAll : () => {
    return new Promise((resolve, reject) => {
      SgroupModel.find().then((sgroups) => {
        resolve(sgroups)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}
