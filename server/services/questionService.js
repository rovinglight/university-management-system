const axios = require('axios')
const questionModel = require('../model/questionModel')
const mongoose = require('mongoose')
const _ = require('lodash')

const questionService = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      questionModel.find().then((result) => {
        resolve(result)
      }).catch((e) => {
        reject(e)
      })
    })
  },
  upsert: (question) => {
    return new Promise((resolve, reject) => {
      if (!question._id) {
        question._id = new mongoose.Types.ObjectId
      }
      questionModel.findOneAndUpdate({
        _id: question._id
      },
      question,
      {
        upsert: true
      }, (err, doc) => {
        if (err) {
          return reject(err)
        }
        questionModel.find().then((result) => {
          resolve(result)
        }).catch((e) => {
          reject(e)
        })
      })
    })
  },
  deleteById: (questionId) => {
    return new Promise((resolve, reject) => {
      questionModel.findByIdAndRemove(questionId).then((result) => {
        questionModel.find().then((result) => {
          resolve(result)
        }).catch((e) => {
          reject(e)
        })
      }).catch((e) => {
        reject(e)
      })
    })
  },
}

module.exports = questionService
