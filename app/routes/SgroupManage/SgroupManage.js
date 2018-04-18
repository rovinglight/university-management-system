import React, { Component } from 'react'
import { Row, Col, Table, Button, Divider, Icon } from 'antd'
import _ from 'lodash'

import './SgroupManage.scss'

export default class SgroupManage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedRowKeys: []
    }
    props.getAllGroups()
  }
  memberTableConverter () {
    const statusConverter = [
      {
        status: 'active',
        display: '活跃'
      }
    ]
    const roleConverter = [
      {
        role: 'president',
        display: '主席'
      }
    ]
    let group = _.find(this.props.sgroups.groups, _.matchesProperty('_id', this.props.match.params.groupId))
    let members = group && group.members.map((member, index) => {
      let role = _.find(roleConverter, _.matchesProperty('role', member.role)).display || member.role
      let status = _.find(statusConverter, _.matchesProperty('status', member.status)).display || member.status
      return{
        key: member.studentId,
        name: member.name,
        status: status,
        role: role,
        joinTime: member.joinTime
      }
    })
    return members
  }
  onSelectChange (selectedRowKeys) {
    this.setState({ selectedRowKeys })
  }
  render () {
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
      dataIndex: 'joinTime'
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;">接受该新成员</a>
          <Divider type="vertical" />
          <a href="javascript:;">进行年审</a>
          <Divider type="vertical" />
          <a href="javascript:;">年度评价</a>
        </span>
      )
    }]
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange.bind(this),
      hideDefaultSelections: true,
      selections: false
    };
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
