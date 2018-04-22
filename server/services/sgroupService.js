const axios = require('axios')
const SgroupModel = require('../model/sgroupModel')
const UserService = require('./UserService')
const mongoose = require('mongoose')
const _ = require('lodash')

module.exports = {
  getAll : () => {
    return new Promise((resolve, reject) => {
      SgroupModel.find().then((sgroups) => {
        resolve(sgroups)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  applyForSgroup : (userId, groupId) => {
    return new Promise((resolve, reject) => {
      SgroupModel.findById(groupId).then(async (sgroup) => {
        if (_.find(sgroup.members, _.matchesProperty('studentId', userId))) {
          return reject ('already a member')
        }
        let student = await UserService.searchById(userId).catch((e) => {
          reject(e)
        })
        sgroup.members.push({
          studentId: student._id.toString(),
          name: student.name,
          status: 'waitForPermission',
          role: '',
          joinTime: '',
          audit: []
        })
        sgroup.save().then((result) => {
          resolve(result)
        })
      }).catch((e) => {
        reject(e)
      })
    })
  },
  acceptNewMember : (userId, groupId) => {
    return new Promise((resolve, reject) => {
      SgroupModel.findById(groupId).then((sgroup) => {
        let memberInfo = _.find(sgroup.members, {'studentId': userId})
        if (!memberInfo) {
          reject('not applied yet')
        }
        if (memberInfo.status === 'active') {
          reject('already a member')
        }
        memberInfo.status = 'active'
        memberInfo.role = 'member'
        memberInfo.joinTime = new Date()
        sgroup.save().then((group) => {
          resolve(group)
        })
      }).catch((e) => {
        reject(e)
      })
    })
  }
}
