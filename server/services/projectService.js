const axios = require('axios')
const projectModel = require('../model/projectModel')
const mongoose = require('mongoose')
const _ = require('lodash')

const projectService = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      projectModel.find().then((result) => {
        resolve(result)
      }).catch((e) => {
        reject(e)
      })
    })
  },
  upsert: (project) => {
    return new Promise((resolve, reject) => {
      if (!project._id) {
        project._id = new mongoose.Types.ObjectId
      }
      projectModel.findOneAndUpdate({
        _id: project._id
      },
      project,
      {
        upsert: true
      }, (err, doc) => {
        if (err) {
          return reject(err)
        }
        projectModel.find().then((result) => {
          resolve(result)
        }).catch((e) => {
          reject(e)
        })
      })
    })
  },
  deleteById: (projectId) => {
    return new Promise((resolve, reject) => {
      projectModel.findByIdAndRemove(projectId).then((result) => {
        projectModel.find().then((result) => {
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

module.exports = projectService
