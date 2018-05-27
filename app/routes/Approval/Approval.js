import React, { Component } from 'react'
import { Row, Col, Button, Tabs, Timeline, Input, Icon, Upload, message, Card, Divider, Avatar } from 'antd'
import _ from 'lodash'
import classnames from 'classnames'
import Moment from 'react-moment'
import 'moment/locale/zh-cn'
import moment from 'moment';
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
  render () {
    let approvalId = this.props.match.params.approvalId
    let approval = _.find(this.props.approval.approvals, {_id: approvalId})
    let approvalProcess = _.get(approval, 'approvalProcess')
    let staticSchema = this.props.static
    let previousStep, allroles = staticSchema.allroles
    let currentStep = _.find(approvalProcess, {status: 'waiting'})
    let approvalComment = _.get(currentStep, 'comment')
    let stepHistory = this.state.stepHistory
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
                      要求文档:
                      <a>申请表</a>
                    </Col>
                  </Row>
                  <Row>
                    <Dragger disabled={_.includes(['rejected', 'complete'], _.get(approval, 'status'))}>
                      <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                      </p>
                      <p className="ant-upload-text">上传申请文件</p>
                      <p className="ant-upload-hint">支持多文件上传，拖拽进来即可</p>
                    </Dragger>
                  </Row>
                  <Row type='flex' align='middle' justify='center'>
                    <Col className='padding-20'>
                      <Button
                        onClick={this.grantStep.bind(this, approval)}
                        className={classnames({hide: _.get(currentStep, 'stepType') !== 'submit'})}>
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
                                className='margin-bottom-10'
                                autosize={{ minRows: 2, maxRows: 6 }}
                                placeholder='意见' />
                            </Col>
                          </Row>
                          <Row type='flex' justify='center'>
                            <Col>
                              <Button onClick={this.submitComment.bind(this, approval)} className='icon-gap'>
                                提交意见
                              </Button>
                              <Button className='icon-gap' onClick={this.grantStep.bind(this, approval)}>
                                通过审批
                              </Button>
                            </Col>
                            <Col>
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
