const _ = require('lodash')
const upload = require('jquery-file-upload-middleware')
const approvalModel = require('../model/approvalModel')
const approvalSchemaModel = require('../model/approvalSchemaModel')
const fs = require('fs')

const uploadController = {
  handleUpload: (req, res, next) => {
    upload.fileHandler({
        uploadDir: function () {
          let type = req.headers.type
          if (type === 'required') {
            let schemaId = req.headers.schemaid
            let stepIndex = req.headers.stepindex
            return `${__dirname}/../uploads/approvalSchema/${schemaId}/${stepIndex}`
          }
          if (type === 'submit') {
            let approvalId = req.headers.approvalid
            let stepIndex = req.headers.stepindex
            return `${__dirname}/../uploads/approval/${approvalId}/${stepIndex}`
          }
          return __dirname + '/../uploads/temp'
        },
        uploadUrl: function () {
            return '/uploads'
        }
    })(req, res, next);
  },
  handleUploadEnd: (fileInfo, req, res) => {
    let type = req.headers.type
    if (type === 'required') {
      let schemaId = req.headers.schemaid
      let stepIndex = req.headers.stepindex
      approvalSchemaModel.findById(schemaId).then((approvalSchema) => {
        approvalSchema.approvalStack[stepIndex].requiredFiles.push(fileInfo.name)
        approvalSchema.save()
      }).catch((e) => {
        console.log(e)
      })
    }
    if (type === 'submit') {
      let approvalId = req.headers.approvalid
      let stepIndex = req.headers.stepindex
      approvalModel.findById(approvalId).then((approval) => {
        approval.approvalProcess[stepIndex].uploadedFile.push(fileInfo.name)
        approval.save()
      }).catch((e) => {
        console.log(e)
      })
    }
    console.log(fileInfo)
  },
  handleDownload (req, res) {
    let type = req.query.type
    if (type === 'required') {
      let schemaId = req.query.schemaId
      let stepIndex = req.query.stepIndex
      let fileName = req.query.fileName
      res.download(`./uploads/approvalSchema/${schemaId}/${stepIndex}/${fileName}`)
    }
    if (type === 'submit') {
      let approvalId = req.query.approvalId
      let stepIndex = req.query.stepIndex
      let fileName = req.query.fileName
      res.download(`./uploads/approval/${approvalId}/${stepIndex}/${fileName}`)
    }
  },
  handleDelete (req, res) {
    let type = req.query.type
    if (type === 'required') {
      let schemaId = req.query.schemaId
      let stepIndex = req.query.stepIndex
      let fileName = req.query.fileName

    }
    if (type === 'submit') {
      let approvalId = req.query.approvalId
      let stepIndex = req.query.stepIndex
      let fileName = req.query.fileName
      approvalModel.findById(approvalId).then((approval) => {
        let uploadFile = approval.approvalProcess[stepIndex].uploadedFile
        approval.approvalProcess[stepIndex].uploadedFile = _.filter(uploadFile, (file) => {
          if (file === fileName) {
            console.log('cut')
            return false
          }
          return true
        })
        approval.save().then((result) => {
          res.status(200).send(result)
        }).catch((e) => {
          console.log(e)
          res.status(400).send(e)
        })
        fs.unlinkSync(`./uploads/approval/${approvalId}/${stepIndex}/${fileName}`)
      }).catch((e) => {
        console.log(e)
      })
    }
  }
}

upload.configure({
    uploadDir: __dirname + '/../uploads/approval',
    uploadUrl: '/uploads'
})
upload.on('end', uploadController.handleUploadEnd)

module.exports = uploadController
