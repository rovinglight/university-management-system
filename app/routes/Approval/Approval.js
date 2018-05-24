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
    console.log(this.props.match.params.approvalId)
    let schema = _.find(this.props.static.approvalSchema, {_id: this.props.match.params.schemaId})
    console.log(schema)
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
                        <Timeline.Item color='green'>校团委书记审批</Timeline.Item>
                        <Timeline.Item color='green'>校团委副书记</Timeline.Item>
                        <Timeline.Item dot={<Icon type="clock-circle-o"/>}>校团委副书记</Timeline.Item>
                        <Timeline.Item>活动结束</Timeline.Item>
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
