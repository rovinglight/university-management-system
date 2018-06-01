import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, List, Avatar, Modal, Input, message, Select, Icon, Pagination, Form } from 'antd'
import classnames from 'classnames'
import authService from '../../service/authService'
const { TextArea } = Input
const Option = Select.Option
const FormItem = Form.Item

import './Projects.scss'

export default class Projects extends Component {
  constructor (props) {
    super(props)
    this.state = {
      newModal: {
        visible: false,
        fields: {
          name: '',
          desc: ''
        }
      }
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
  toggleModal () {
    this.setState({
      newModal: {
        ...this.state.newModal,
        visible: !this.state.newModal.visible
      }
    })
  }
  submitModal () {
    let user = _.cloneDeep(this.props.userInfo)
    _.unset(user, 'isAuthorized')
    let project = this.state.newModal.fields
    _.assign(project, {
      sponsorId: this.props.userInfo._id,
      sponsorName: this.props.userInfo.name,
      foundTime: new Date(),
      status: 'active',
      members: [{
        'memberId': user._id,
        'memberName': user.name,
        'status': 'active'
      }]
    })
    this.props.upsertProject(project).then((res) => {
      message.success('创建成功')
      this.toggleModal()
    }).catch((e) => {
      message.error('创建失败')
    })
  }
  applyForProject (project) {
    let user = this.props.userInfo
    project = _.cloneDeep(project)
    delete project.__v
    project.members.push({
      memberId: user._id,
      memebrName: user.name,
      status: 'waitForPermission'
    })
    this.props.upsertProject(project).then((res) => {
      message.success('申请成功')
      this.toggleModal()
    }).catch((e) => {
      message.error('申请失败')
    })
  }
  render () {
    let user = this.props.userInfo
    let projects = this.props.project.projects
    let isAuthorized = this.props.userInfo.isAuthorized
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    )
    return (
      <div className="projects">
        <Row className="page-title">
          <Col>
            <h1>项目库</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="shadow-box bg-white padding-20 margin-bottom-25">
              <h2>
                所有项目
                <Button
                  onClick={this.toggleModal.bind(this)}
                  className={classnames('float-right vertical-middle', {
                    hide: !isAuthorized([
                      {role: "student"},
                      {role: "teacher"}
                    ])
                  })}
                  shape="circle"
                  icon='plus'
                  size='large' />
              </h2>
              <Row>
                <Col>
                  <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                      onChange: (page) => {
                        console.log(page);
                      },
                      pageSize: 5,
                    }}
                    dataSource={projects}
                    renderItem={(item, index) => {
                      let actionsToDisplay = [
                        <IconText type="team" text={item.members.length} />,
                      ]
                      if (!_.find(item.members, {memberId: user._id}) && isAuthorized([{role: 'student'}])) {
                        actionsToDisplay.push(<a onClick={this.applyForProject.bind(this, item)}>申请加入</a>)
                      }
                      if (item.sponsorId === user._id || isAuthorized([])) {
                        actionsToDisplay.push(<a>管理</a>)
                      }
                      return (
                        <List.Item
                          key={index}
                          actions={actionsToDisplay}
                        >
                          <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a>{item.name}</a>}
                            description={`发起人：${item.sponsorName}`}
                          />
                          {item.desc}
                        </List.Item>
                      )
                    }}
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Modal
          visible={this.state.newModal.visible}
          title='创建项目'
          onCancel={this.toggleModal.bind(this)}
          footer={[
            <Button key="back" onClick={this.toggleModal.bind(this)}>放弃创建</Button>,
            <Button key="submit" onClick={this.submitModal.bind(this)} type="primary">
              创建项目
            </Button>,
          ]}>
          <FormItem label='项目名称'>
            <Input value={this.state.newModal.fields.name} onChange={this.handleChange.bind(this, 'newModal.fields.name')} />
          </FormItem>
          <FormItem label='项目简介'>
            <TextArea value={this.state.newModal.fields.desc} onChange={this.handleChange.bind(this, 'newModal.fields.desc')} />
          </FormItem>
        </Modal>
      </div>
    )
  }
}
