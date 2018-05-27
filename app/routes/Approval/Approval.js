import React, { Component } from 'react'
import { Row, Col, Button, Tabs, Timeline, Input, Icon, Upload, message } from 'antd'
import _ from 'lodash'
import classnames from 'classnames'
const TabPane = Tabs.TabPane
const { TextArea } = Input
const Dragger = Upload.Dragger

import './Approval.scss'

export default class Approval extends Component {
  constructor (props) {
    super(props)
    this.state = {
      approval: {}
    }
  }
  jumpTo (path) {
    this.props.history.push(path)
  }
  grantStep (approval) {
    approval = _.cloneDeep(approval)
    approval.status = 'processing'
    if (_.findIndex(approval.approvalProcess, {status: 'waiting'}) === (approval.approvalProcess.length - 1)) {
      approval.status = 'complete'
    }
    let currentStep = _.find(approval.approvalProcess, {status: 'waiting'})
    currentStep.status = 'passed'
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
    let approvalId = this.props.match.params.approvalId
    this.props.updateApproval(approval).then(() => {
      message.success('提交成功')
    }).catch((e) => {
      message.error('提交失败')
    })
  }
  render () {
    let approvalId = this.props.match.params.approvalId
    let approval = _.find(this.props.approval.approvals, {_id: approvalId})
    let approvalProcess = _.get(approval, 'approvalProcess')
    let staticSchema = this.props.static
    let previousStep, allroles = staticSchema.allroles
    let currentStep = _.find(approvalProcess, {status: 'waiting'})
    console.log(currentStep)
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
                            <Timeline.Item key={index} color={color} dot={dot}>{str}</Timeline.Item>
                          )
                        })}
                      </Timeline>
                    </Col>
                    <Col span={16}>
                      <TextArea className='margin-bottom-10' autosize={{ minRows: 2, maxRows: 6 }} placeholder='意见' />
                      <Row className={classnames({hide: _.includes(['rejected', 'complete', 'notSubmit'], _.get(approval, 'status'))})} type='flex' justify='center'>
                        <Col>
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
