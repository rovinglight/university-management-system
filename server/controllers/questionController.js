const axios = require('axios')
const questionService = require('../services/questionService')
const _ = require('lodash')

module.exports = {
  getAll: (req, res) => {
    questionService.getAll().then((result) => {
      res.status(200).send(result)
    }).catch((e) => {
      res.status(400).send(e)
    })
  },
  upsert: (req, res) => {
    let question = req.body.question
    questionService.upsert(question).then((result) => {
      res.status(200).send(result)
    }).catch((e) => {
      res.status(400).send(e)
    })
  },
  delete: (req, res) => {
    let questionId = req.body.questionId
    questionService.deleteById(questionId).then((result) => {
      res.status(200).send(result)
    }).catch((e) => {
      res.status(400).send(e)
    })
  }
}
