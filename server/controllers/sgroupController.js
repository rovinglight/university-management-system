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
  },
  applyForSgroup: (req, res) => {
    let userId = req.userInfo._id.toString()
    let groupId = req.params.groupId
    sgroupService.applyForSgroup(userId, groupId).then((result) => {
      res.status(200).send(result)
    }).catch((e) => {
      res.status(400).send(e)
    })
  },
  acceptNewMember: (req, res) => {
    let groupId = req.params.groupId
    let userIdList = req.body.userId
    sgroupService.acceptNewMember(userIdList, groupId).then((group) => {
      res.status(200).send(group)
    }).catch((e) => {
      console.error(e)
      res.status(400).send(e)
    })
  },
  deleteMembers: (req, res) => {
    let groupId = req.params.groupId
    let userIdList = req.body.userId
    sgroupService.deleteMembers(userIdList, groupId).then((group) => {
      res.status(200).send(group)
    }).catch((e) => {
      console.log(e)
      res.status(400).send(e)
    })
  },
  rejectNewMembers : (req, res) => {
    let groupId = req.params.groupId
    let userIdList = req.body.userId
    sgroupService.rejectNewMembers(userIdList, groupId).then((group) => {
      res.status(200).send(group)
    }).catch((e) => {
      console.log(e)
      res.status(400).send(e)
    })
  },
  updateGroupInfo : (req, res) => {
    let groupId = req.params.groupId
    let infoToUpdate = req.body.infoToUpdate
    sgroupService.updateGroupInfo(infoToUpdate, groupId).then((group) => {
      res.status(200).send(group)
    }).catch((e) => {
      res.status(400).send(e)
    })
  },
  acceptionStatusChange : (req, res) => {
    let groupIdList = req.body.groupIdList
    let newStatus = req.body.newStatus
    sgroupService.acceptionStatusChange(groupIdList, newStatus).then((result) => {
      res.status(200).send(result)
    }).catch((e) => {
      console.log(e)
      res.status(400).send(e)
    })
  }
}
