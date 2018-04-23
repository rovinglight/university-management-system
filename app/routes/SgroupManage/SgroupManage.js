import React, { Component } from 'react'
import { Row, Col, Table, Button, Divider, Icon, message } from 'antd'
import _ from 'lodash'
import classnames from 'classnames'
import Moment from 'react-moment'
import 'moment/locale/zh-cn'

import './SgroupManage.scss'

export default class SgroupManage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedRowKeys: []
    }
    props.getAllGroups()
  }
  acceptNewMembers (userIdList, groupId) {
    this.props.acceptNewMember(userIdList, groupId).then((result) => {
      message.success('新成员接受成功')
    }).catch((e) => {
      message.error('新成员接受失败')
    })
  }
  deleteMembers (userIdList, groupId) {
    this.props.deleteMembers(userIdList, groupId).then((result) => {
      message.success('删除成功')
    }).catch((e) => {
      message.error('删除失败')
    })
  }
  memberTableConverter () {
    const statusConverter = [
      {
        status: 'active',
        display: '活跃'
      },
      {
        status: 'waitForPermission',
        display: '等待通过'
      }
    ]
    const roleConverter = [
      {
        role: 'studentGroupPresident',
        display: '主席'
      }, {
        role: 'studentGroupMember',
        display: '成员'
      }
    ]
    let group = _.find(this.props.sgroups.groups, {'_id': this.props.match.params.groupId})
    let members = group && group.members.map((member, index) => {
      let roleDisplayRules = _.find(roleConverter, {'role': member.role})
      let statusDisplayRules = _.find(statusConverter, {'status': member.status})
      let role = roleDisplayRules && roleDisplayRules.display || member.role
      let status = statusDisplayRules && statusDisplayRules.display || member.status
      return{
        key: member.studentId,
        name: member.name,
        status: status,
        role: role,
        joinTime: member.joinTime,
        member: member
      }
    })
    return members
  }
  onSelectChange (selectedRowKeys) {
    this.setState({ selectedRowKeys })
  }
  render () {
    let groupInfo = _.find(this.props.sgroups.groups, {'_id': this.props.match.params.groupId})
    let groupId = _.get(groupInfo, '_id')
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
    }, {
      title: '状态',
      dataIndex: 'status',
    }, {
      title: '角色',
      dataIndex: 'role'
    }, {
      title: '加入时间',
      render: (text, record) => {
        if (!record.joinTime) {
          return
        }
        return(
          <Moment locale="zh-cn" format="MMMDo YYYY，a" fromNow>{record.joinTime}</Moment>
        )
      }
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a
            className={classnames({hide: !(record.member.status === 'waitForPermission')})}
            onClick={this.acceptNewMembers.bind(this, [record.key], groupInfo._id)}
            href="javascript:;">
            接受该新成员
            <Divider type="vertical" />
          </a>

          <a href="javascript:;">
            进行年审
            <Divider type="vertical" />
          </a>
          <a href="javascript:;">年度评价</a>
        </span>
      )
    }]
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange.bind(this),
      hideDefaultSelections: true,
      selections: false
    }
    let members = this.memberTableConverter()
    return (
      <div className="sgroupmanage">
        <Row className="page-title">
          <Col>
            <h1>社团管理</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="shadow-box bg-white padding-20 margin-bottom-25">
              <h2>基本信息</h2>
              <Row>
                <Col>

                </Col>
              </Row>
            </div>
          </Col>
          <Col>
            <div className="shadow-box bg-white padding-20 margin-bottom-25">
              <h2 className="margin-bottom-25">成员信息</h2>
              <Row>
                <Col>
                  <Row className='margin-bottom-10'>
                    <Col>
                      <Button className='icon-gap' onClick={this.props.getAllGroups}>刷新</Button>
                      <Button className='icon-gap' onClick={this.acceptNewMembers.bind(this, this.state.selectedRowKeys, groupId)}>接受加入申请</Button>
                      <Button className='icon-gap' onClick={this.deleteMembers.bind(this, this.state.selectedRowKeys, groupId)} >删除成员</Button>
                      <Button >拒绝加入申请</Button>
                    </Col>
                  </Row>
                  <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={members} />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
