import React, { Component } from 'react'
import { Row, Col, Button, Tabs, Timeline, Input, Icon, Upload, message, Card, Divider, Avatar } from 'antd'
import _ from 'lodash'
import classnames from 'classnames'
import Moment from 'react-moment'
import 'moment/locale/zh-cn'
import moment from 'moment'
import axios from 'axios'
import config from '../../config/config'
const TabPane = Tabs.TabPane
const { TextArea } = Input
const Dragger = Upload.Dragger

import './Approval.scss'

export default class Approval extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comment: '',
      showStepHistory: false,
      stepHistoryIndex: '',
      stepHistory: {}
    }
  }
  jumpTo (path) {
    this.props.history.push(path)
  }
  handleChange (path, result) {
    if (_.get(result, 'target')) {
      result = result.target.value
    }
    let newState = _.cloneDeep(this.state)
    _.set(newState, path, result)
    this.setState(newState)
  }
  grantStep (approval) {
    approval = _.cloneDeep(approval)
    approval.status = 'processing'
    if (_.findIndex(approval.approvalProcess, {status: 'waiting'}) === (approval.approvalProcess.length - 1)) {
      approval.status = 'complete'
    }
    let currentStep = _.find(approval.approvalProcess, {status: 'waiting'})
    currentStep.status = 'passed'
    currentStep.operatorName = this.props.userInfo.name
    currentStep.operatorId = this.props.userInfo._id
    currentStep.performDate = new Date()
    let approvalId = this.props.match.params.approvalId
    this.props.updateApproval(approval).then(() => {
      message.success('提交成功')
    }).catch((e) => {
      message.error('提交失败')
    })
  }
  rejectStep (approval) {
    approval = _.cloneDeep(approval)
    approval.status = 'rejected'
    let currentStep = _.find(approval.approvalProcess, {status: 'waiting'})
    currentStep.status = 'rejected'
    currentStep.operatorName = this.props.userInfo.name
    currentStep.operatorId = this.props.userInfo._id
    currentStep.performDate = new Date()
    let approvalId = this.props.match.params.approvalId
    this.props.updateApproval(approval).then(() => {
      message.success('提交成功')
    }).catch((e) => {
      message.error('提交失败')
    })
  }
  submitComment (approval) {
    approval = _.cloneDeep(approval)
    let currentStep = _.find(approval.approvalProcess, {status: 'waiting'})
    currentStep.comment.push({
      'commentDate': new Date(),
      'content': this.state.comment,
      'commenter': this.props.userInfo.name
    })
    this.props.updateApproval(approval).then(() => {
      this.setState({
        comment: ''
      })
      message.success('提交成功')
    }).catch((e) => {
      message.error('提交失败')
    })
  }
  showStepHistory (step, index) {
    this.setState({
      showStepHistory: true,
      stepHistoryIndex: index,
      stepHistory: step
    })
  }
  toggleStepHistory () {
    this.setState({
      showStepHistory: !this.state.showStepHistory
    })
  }
  requiredFileGenerator (requiredFiles = [], currentStepIndex, schemaId) {
    let requiredFilesList =  requiredFiles.map((file, index) => {
      return {
        name: file,
        url: `http://${config.ums_web.host}:${config.ums_web.port}/files?type=required&schemaId=${schemaId}&stepIndex=${currentStepIndex}&fileName=${file}`
      }
    })
    return requiredFilesList.map((file, index) => {
      return (
        <a key={index} href={file.url}>{file.name}<Divider type="vertical" /></a>
      )
    })
  }
  render () {
    let user = this.props.userInfo
    let approvalId = this.props.match.params.approvalId
    let approval = _.find(this.props.approval.approvals, {_id: approvalId}) || {}
    _.unset(approval, '__v')
    let schemaId = _.get(approval, 'schemaId')
    let approvalProcess = _.get(approval, 'approvalProcess')
    let staticSchema = this.props.static
    let previousStep, allroles = staticSchema.allroles
    let currentStep = _.find(approvalProcess, {status: 'waiting'}) || {}
    let currentStepIndex = _.findIndex(approvalProcess, {status: 'waiting'})
    let approvalComment = _.get(currentStep, 'comment')
    let stepHistory = this.state.stepHistory
    let isAuthorized = _.get(this.props, 'userInfo.isAuthorized') || (() => true)
    let sessionKey = localStorage.getItem('sessionKey')
    let requiredFilesList = this.requiredFileGenerator(currentStep.requiredFiles, currentStepIndex, schemaId)
    let uploadedFile = currentStep.uploadedFile
    let defaultUploadedFile = _.cloneDeep(currentStep.uploadedFile)
    let fileStepIndex = currentStepIndex
    if (currentStep && currentStep.stepType !== 'submit' && currentStepIndex !== 0) {
      for(let i = currentStepIndex; i >= 0; i--) {
        if (approvalProcess[i].stepType !== 'submit') {
          continue
        } else {
          defaultUploadedFile = approvalProcess[i].uploadedFile
          fileStepIndex = i
          break
        }
      }
    }
    let defaultFileList = defaultUploadedFile && defaultUploadedFile.map((file, index) => {
      return {
        uid: index,
        name: file,
        url: `http://${config.ums_web.host}:${config.ums_web.port}/files?type=submit&approvalId=${approvalId}&stepIndex=${fileStepIndex}&fileName=${file}`
      }
    })
    let props = {
      name: 'file',
      action: `http://${config.ums_web.host}:${config.ums_web.port}/upload`,
      headers: {
        type: 'submit',
        approvalid: approvalId,
        status: 'done',
        stepindex: currentStepIndex
      },
      defaultFileList: defaultFileList,
      beforeUpload: (file, fileList) => {
        return new Promise((resolve, reject) => {
          if (_.includes(uploadedFile, file.name)) {
            message.error('请勿上传同名文件')
            return reject(file)
          }
          file.url = `http://${config.ums_web.host}:${config.ums_web.port}/files?type=submit&approvalId=${approvalId}&stepIndex=${currentStepIndex}&fileName=${file.name}`
          return resolve(file)
        })
      },
      onChange(info) {
        if (info.file.status === 'done') {
          console.log(info)
          currentStep.uploadedFile.push(info.file.name)
          message.success(`${info.file.name} 上传成功`)
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败`)
        }
      },
      onRemove (file) {
        return new Promise((resolve, reject) => {
          axios({
            method: 'delete',
            url: file.url
          }).then((res) => {
            currentStep.uploadedFile = _.filter(currentStep.uploadFile, (uFile) => {
              if (uFile === file.name) {
                return false
              }
              return true
            })
            message.success('删除成功')
            resolve(true)
          }).catch((e) => {
            message.error('删除失败')
            reject(file)
          })
        })
      }
    }
    let dragger = (<div/>)
    if (currentStep._id) {
      dragger = (
        <Dragger {...props} disabled={_.includes(['rejected', 'complete'], _.get(approval, 'status')) || (currentStep.stepType !== 'submit')}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">上传申请文件</p>
          <p className="ant-upload-hint">支持多文件上传，拖拽进来即可</p>
        </Dragger>
      )
    }
    if (sessionKey) {
      props.headers.sessionkey = sessionKey
    }
    console.log(this.state)
    return (
      <div className="approval">
        <Row className="page-title">
          <Col>
            <h1>审批</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="shadow-box bg-white padding-20 margin-bottom-25">
              <Tabs defaultActiveKey="1">
                <TabPane tab="信息提交" key="1">
                  <Row className='margin-bottom-10'>
                    <Col>
                      要求文档：
                      {requiredFilesList}
                    </Col>
                  </Row>
                  <Row>
                    {dragger}
                  </Row>
                  <Row type='flex' align='middle' justify='center'>
                    <Col className='padding-20'>
                      <Button
                        onClick={this.grantStep.bind(this, approval)}
                        className={classnames({
                          hide: (_.get(currentStep, 'stepType') !== 'submit') || (user._id !== _.get(approval, 'sponsorId')) && !isAuthorized([])
                        })}>
                        提交审核
                      </Button>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tab="申请状态" key="2">
                  <Row>
                    <Col className='padding-20' span={8}>
                      <Timeline>
                        {
                          approvalProcess && approvalProcess.map((step, index) => {
                          let convertedRole = _.get(_.find(allroles, {role: step.role}), 'display') || step.role
                          let color = step.status === 'passed' && 'green' || step.status === 'rejected' && 'red' || step.status === 'waiting' && 'blue'
                          let dot = step.status === 'waiting' && (!previousStep || previousStep.status === 'passed') ? (<Icon type="clock-circle-o"/>) : ''
                          previousStep = step
                          let str = step.stepType === 'submit' ? '文件提交' : `${convertedRole}审批`
                          return(
                            <Timeline.Item key={index} color={color} dot={dot}>
                              {str}
                              <Divider type="vertical" />
                              <a
                                className={classnames({hide: step.status === 'waiting'})}
                                onClick={this.showStepHistory.bind(this, step, index)}>
                                <Icon type="eye-o" />
                              </a>
                            </Timeline.Item>
                          )
                        })}
                      </Timeline>
                    </Col>
                    <Col span={16}>
                      <Row>
                        <Card
                          className={classnames('margin-bottom-25', {hide: !this.state.showStepHistory})}
                          title={<span><Avatar className='bg-gradient-5 icon-gap'>{this.state.stepHistoryIndex + 1}</Avatar>历史信息</span>}
                          extra={
                            <a onClick={this.toggleStepHistory.bind(this)}>
                            <Icon type="close" />
                            </a>
                          }>
                          <p>执行人员: {stepHistory.operatorName}</p>
                          <p>执行日期: {<Moment locale="zh-cn" format="YYYY年MMMDo，a hh:mm" fromNow>{stepHistory.performDate}</Moment>}</p>
                          <p>审批意见: </p>
                          {stepHistory.comment && stepHistory.comment.map((comment, index) => {
                            return (
                              <Card
                                className='margin-bottom-10'
                                hoverable
                                key={index}
                                type="inner"
                                title={comment.commenter}
                                extra={<Moment locale="zh-cn" format="MMMDo YYYY，a" fromNow>{comment.commentDate}</Moment>}
                              >
                                {comment.content}
                              </Card>
                            )
                          })}
                        </Card>
                      </Row>
                      <Row className={classnames({hide: _.includes(['rejected', 'complete', 'notSubmit'], _.get(approval, 'status'))})} >
                        <Card
                          title="审批操作">
                          <Row>
                            <Col>
                              {approvalComment && approvalComment.map((comment, index) => {
                                return (
                                  <Card
                                    className='margin-bottom-10'
                                    hoverable
                                    key={index}
                                    type="inner"
                                    title={comment.commenter}
                                    extra={<Moment locale="zh-cn" format="MMMDo YYYY，a" fromNow>{comment.commentDate}</Moment>}
                                  >
                                    {comment.content}
                                  </Card>
                                )
                              })}
                            </Col>
                            <Col>
                              <TextArea
                                value={this.state.comment}
                                onChange={this.handleChange.bind(this, 'comment')}
                                className={classnames('icon-gap margin-bottom-10', {
                                  hide: !isAuthorized([{role: currentStep.role}]) && (approval.sponsorId !== user._id)
                                })}
                                autosize={{ minRows: 2, maxRows: 6 }}
                                placeholder='意见' />
                            </Col>
                          </Row>
                          <Row type='flex' justify='center'>
                            <Col className={classnames({
                              hide: !isAuthorized([{role: currentStep.role}]) && (approval.sponsorId !== user._id)
                            })}>
                              <Button
                                className={classnames('icon-gap', {
                                  hide: !isAuthorized([{role: currentStep.role}]) && (approval.sponsorId !== user._id)
                                })}
                                onClick={this.submitComment.bind(this, approval)}
                                className='icon-gap'>
                                提交意见
                              </Button>
                            </Col>
                            <Col className={classnames({
                              hide: !isAuthorized([{role: currentStep && currentStep.role}])
                            })}>
                              <Button className='icon-gap' onClick={this.grantStep.bind(this, approval)}>
                                通过审批
                              </Button>
                              <Button type='danger' onClick={this.rejectStep.bind(this, approval)}>
                                不予通过
                              </Button>
                            </Col>
                          </Row>
                        </Card>
                      </Row>
                    </Col>
                  </Row>
                </TabPane>
              </Tabs>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
