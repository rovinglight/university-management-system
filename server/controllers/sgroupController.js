const axios = require('axios')
const sgroupService = require('../services/sgroupService')
const _ = require('lodash')

module.exports = {
  getAllGroups: (req, res) => {
    sgroupService.getAll().then((groups) => {
      res.status(200).send(groups)
    }).catch((e) => {
      res.status(404).send(e)
    })
  }
}
