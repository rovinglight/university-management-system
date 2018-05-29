const DB = require('../db/connect')
const mongoose = require('mongoose')

//用以记录项目库中项目的collection
const questionSchema = new mongoose.Schema({
  questionerName: String,
  questionerId: String,
  question: String,
  time: Date,
  reply: [{
    replierId: String,
    replierName: String,
    content: String,
    replyTime: Date
  }]
})

const questionModel = DB.model('question', questionSchema)

module.exports = questionModel
