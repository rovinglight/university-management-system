import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, List, Avatar, Modal, Input, message, Select, Icon, Pagination, Form, Table, Divider } from 'antd'
import classnames from 'classnames'
import authService from '../../service/authService'
const { TextArea } = Input
const Option = Select.Option
const FormItem = Form.Item

import './ProjectDetail.scss'

export default class ProjectDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {

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
  acceptNewMember (memberId, project) {
    let member = _.find(project.members, {memberId: memberId})
    member.status = 'active'
    _.unset(project, '__v')
    this.props.upsertProject(project).then((res) => {
      message.success('更新成功')
    }).catch((e) => {
      message.error('更新失败')
    })
  }
  deleteMember (memberId, project) {
    project.members = _.filter(project.members, (member) => {
      if (member.memberId === memberId) {
        return false
      }
      return true
    })
    _.unset(project, '__v')
    this.props.upsertProject(project).then((res) => {
      message.success('删除成功')
    }).catch((e) => {
      message.error('删除失败')
    })
  }
  dataGenerator (members) {
    const statusConverter = [
      {
        status: 'active',
        display: "成员"
      }, {
        status: 'waitForPermission',
        display: "等待通过"
      }
    ]
    return members.map((member, index) => {
      return {
        memberId: member.memberId,
        name: member.memberName,
        key: index,
        status: member.status,
        displayStatus: _.get(_.find(statusConverter, {status: member.status}), 'display')
      }
    })
  }
  render () {
    let projectId = this.props.match.params.projectId
    let user = this.props.userInfo
    let projects = this.props.project.projects
    let project = _.find(projects, {_id: projectId}) || {}
    let members = _.get(project, 'members') || []
    let data = this.dataGenerator(members)
    let isAuthorized = this.props.userInfo.isAuthorized
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
    }, {
      title: '状态',
      dataIndex: 'displayStatus',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a
            className={classnames({
              hide: record.status !== 'waitForPermission'
            })}
            onClick={this.acceptNewMember.bind(this, record.memberId, project)}>
            接受成员
            <Divider type="vertical" />
          </a>
          <a
            onClick={this.deleteMember.bind(this, record.memberId, project)}
            className={classnames({
              hide: project.sponsorId === user._id
            })}>
            删除成员
          </a>
        </span>
      )
    }]
    return (
      <div className="project-detail">
        <Row className="page-title">
          <Col>
            <h1>项目详情</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="shadow-box bg-white padding-20 margin-bottom-25">
              <h2>
                {project.name}
              </h2>
              <Row>
                <Col>
                  {project.desc}
                </Col>
              </Row>
            </div>
          </Col>
          <Col>
            <div className="shadow-box bg-white padding-20 margin-bottom-25">
              <h2>
                成员管理
              </h2>
              <Row>
                <Col>
                  <Table columns={columns} dataSource={data} />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
