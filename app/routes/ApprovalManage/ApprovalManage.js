import React, { Component } from 'react'
import { Row, Col, Button, Divider, Select, Tooltip, List, Avatar, message, Form, Upload, Icon } from 'antd'
import GroupCard from '../../components/GroupCard/GroupCard'
import classnames from 'classnames'
import authService from '../../service/authService'
const Option = Select.Option
const FormItem = Form.Item;

import './ApprovalManage.scss'

export default class ApprovalManage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      selectedProcess: '',
      processToEdit: {}
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
  changeProcess (newProcess) {
    let selectedApproval = _.cloneDeep(_.find(this.props.static.approvalSchema, {_id: newProcess}))
    this.setState({
      selectedProcess: newProcess,
      processToEdit: selectedApproval
    })
  }
  addProcess () {
    let newState = _.cloneDeep(this.state)
    newState.processToEdit.approvalStack.push({role: ''})
    this.setState(newState)
  }
  removeProcess (index) {
    let newState = _.cloneDeep(this.state)
    newState.processToEdit.approvalStack.splice(index, 1)
    this.setState(newState)
  }
  swapProcess (from, to) {
    let newState = _.cloneDeep(this.state)
    let approvalStack = newState.processToEdit.approvalStack
    let temp = approvalStack[from]
    approvalStack[from] = approvalStack[to]
    approvalStack[to] = temp
    this.setState(newState)
  }
  saveSchema () {
    if (!this.state.selectedProcess) {
      return message.error('未选中')
    }
    let approvalSchema = _.cloneDeep(this.props.static.approvalSchema)
    let oldSchema = _.find(approvalSchema, {_id: this.state.selectedProcess})
    _.assign(oldSchema, this.state.processToEdit)
    this.setState({loading: true})
    this.props.updateApprovalSchema(approvalSchema, [this.state.selectedProcess]).then((result) => {
      message.success('更新成功')
      this.setState({loading: false})
    }).catch((e) => {
      message.error('更新失败')
      this.setState({loading: false})
    })
  }
  render () {
    console.log(this.state)
    let groups = this.props.sgroups.groups
    let userId = _.get(this.props, 'userInfo._id')
    let userAuths = _.get(this.props, 'userInfo.auth')
    let isAuthorized = authService.isAuthorized(userAuths)
    let approvalSchemas = this.props.static.approvalSchema
    let processToEdit = this.state.processToEdit
    let approvalStack = _.get(this.state, 'processToEdit.approvalStack') || []
    let allroles = this.props.static.allroles
    let stepTypes = _.get(this.props, 'static.approvalStep.type')
    return (
      <div className="approval-manage">
        <Row className="page-title">
          <Col>
            <h1>动态审核设置</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="shadow-box bg-white padding-20 margin-bottom-25">
              <h2>
                审核设置
                <Tooltip title="保存当前审核流程">
                  <Button
                    className={classnames('float-right vertical-middle', {
                      hide: !isAuthorized([])
                    })}
                    loading={this.state.loading}
                    onClick={this.saveSchema.bind(this)}
                    shape="circle"
                    icon='save'
                    size='large' />
                </Tooltip>
              </h2>
              <Divider>审核流程选择</Divider>
              <Row type='flex' justify='center'>
                <Col xl={6} lg={12} span={20}>
                  <Select value={this.state.selectedProcess} onChange={this.changeProcess.bind(this)} style={{ width: '100%' }}>
                    {
                      approvalSchemas.map((schema, index) => {
                        return (
                          <Option key={index} value={schema._id}>{schema.name}</Option>
                        )
                      })
                    }
                  </Select>
                </Col>
              </Row>
              <Divider>审核流程编辑</Divider>
              <Row type='flex' justify='center'>
                <Col>
                  <Button
                    className={classnames({hide: !this.state.selectedProcess})}
                    onClick={this.addProcess.bind(this)}
                    shape="circle"
                    icon='plus'
                    size='large' />
                </Col>
              </Row>
              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={approvalStack}
                renderItem={(item, index) => (
                  <List.Item actions={[
                    <Button disabled={index === 0} onClick={this.swapProcess.bind(this, index, index - 1)} shape="circle" icon="arrow-up" />,
                    <Button disabled={index + 1 === approvalStack.length} onClick={this.swapProcess.bind(this, index, index + 1)} shape="circle" icon="arrow-down" />,
                    <Button onClick={this.removeProcess.bind(this, index)} shape="circle" icon="delete" />
                  ]}>
                    <List.Item.Meta
                      avatar={<Avatar className='bg-gradient-5'>{index + 1}</Avatar>}
                      title={<span>步骤设置</span>}
                      description={
                        <FormItem label='步骤类型'>
                          <Select value={item.stepType} style={{ width: 120 }} onChange={this.handleChange.bind(this, `processToEdit.approvalStack[${index}].stepType`)}>
                            {
                              stepTypes.map((stepType, i) => {
                                return (
                                  <Option key={i} value={stepType.type}>{stepType.display}</Option>
                                )
                              })
                            }
                          </Select>
                        </FormItem>
                      }
                    />
                    <FormItem className={classnames({hide: item.stepType !== 'approval'})} label='审批人'>
                      <Select
                        value={item.role} style={{ width: 120 }}
                        onChange={this.handleChange.bind(this, `processToEdit.approvalStack[${index}].role`)}>
                        {
                          allroles.map((role, i) => {
                            return (
                              <Option key={i} value={role.role}>{role.display}</Option>
                            )
                          })
                        }
                      </Select>
                    </FormItem>
                    <FormItem className={classnames({hide: item.stepType !== 'submit'})} label='所需文件'>
                      <Upload>
                        <Button>
                          <Icon type="upload" /> Upload
                        </Button>
                      </Upload>
                    </FormItem>
                  </List.Item>
                )}
              />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
