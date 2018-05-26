import React, { Component } from 'react'
import { Row, Col, Button, Tabs, Timeline, Input, Icon, Upload } from 'antd'
import _ from 'lodash'
const TabPane = Tabs.TabPane
const { TextArea } = Input
const Dragger = Upload.Dragger

import './Approval.scss'

export default class Approval extends Component {
  constructor (props) {
    super(props)
  }
  jumpTo (path) {
    this.props.history.push(path)
  }
  render () {
    let approvalId = this.props.match.params.approvalId
    let approval = _.find(this.props.approval.approvals, {_id: approvalId})
    let approvalProcess = _.get(approval, 'approvalProcess')
    let staticSchema = this.props.static
    let previousStep, allroles = staticSchema.allroles
    console.log(approval)
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
                  <Dragger>
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">上传申请文件</p>
                    <p className="ant-upload-hint">支持多文件上传，拖拽进来即可</p>
                  </Dragger>
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
                          return(
                            <Timeline.Item key={index} color={color} dot={dot}>{`${convertedRole}审批`}</Timeline.Item>
                          )
                        })}
                      </Timeline>
                    </Col>
                    <Col span={16}>
                      <TextArea autosize={{ minRows: 2, maxRows: 6 }} placeholder='意见' />
                      <Row type='flex' justify=''>
                        <Col>
                          <Button>通过审批</Button>
                        </Col>
                        <Col>
                          <Button type='danger'>不予通过</Button>
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
