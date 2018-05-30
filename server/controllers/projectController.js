const axios = require('axios')
const projectService = require('../services/projectService')
const _ = require('lodash')

module.exports = {
  getAll: (req, res) => {
    projectService.getAll().then((result) => {
      res.status(200).send(result)
    }).catch((e) => {
      res.status(400).send(e)
    })
  },
  upsert: (req, res) => {
    let project = req.body.project
    projectService.upsert(project).then((result) => {
      res.status(200).send(result)
    }).catch((e) => {
      res.status(400).send(e)
    })
  },
  delete: (req, res) => {
    let projectId = req.body.projectId
    projectService.deleteById(projectId).then((result) => {
      res.status(200).send(result)
    }).catch((e) => {
      res.status(400).send(e)
    })
  }
}
