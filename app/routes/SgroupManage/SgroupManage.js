import React, { Component } from 'react'
import { Row, Col, Table, Button, Divider, Icon, message, Modal, DatePicker, Input } from 'antd'
import _ from 'lodash'
import classnames from 'classnames'
import Moment from 'react-moment'
import 'moment/locale/zh-cn'
import moment from 'moment';
import AuthService from '../../service/authService'
const { TextArea } = Input

import './SgroupManage.scss'

export default class SgroupManage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedRowKeys: [],
      infoModal: {
        show: false,
        loading: false,
        fields: {
          foundTime: '',
          desc: ''
        }
      }
    }
    props.getAllGroups().then((groups) => {
      let group = _.find(groups, {'_id': props.match.params.groupId})
      this.setState({
        infoModal: {
          ...this.state.infoModal,
          fields: {
            foundTime: group.foundTime,
            desc: group.desc
          }
        }
      })
    })
  }
  componentDidUpdate () {
    let userInfo = _.get(this.props, 'userInfo')
    // if (userInfo.role && userInfo.role === 'visitor') {
    //   this.jumpTo('/')
    // }
  }
  jumpTo (path) {
    this.props.history.push(path)
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
  rejectMembers (userIdList, groupId) {
    this.props.rejectMembers(userIdList, groupId).then((result) => {
      message.success('拒绝成功')
    }).catch((e) => {
      message.error('拒绝失败')
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
  refreshMemberList () {
    this.props.getAllGroups().then((groups) => {
      message.success('成员信息刷新成功')
    })
  }
  toggleInfoModal () {
    this.setState({
      infoModal: {
        ...this.state.infoModal,
        show: !this.state.infoModal.show
      }
    })
  }
  cancelInfoModal () {
    console.log('cancel')
    let group = _.find(this.props.sgroups.groups, {'_id': this.props.match.params.groupId})
    this.setState({
      infoModal: {
        ...this.state.infoModal,
        show: false,
        fields: {
          foundTime: group.foundTime,
          desc: group.desc
        }
      }
    })
  }
  submitInfoModal () {
    let groupId = this.props.match.params.groupId
    this.setState({
      infoModal: {
        ...this.state.infoModal,
        loading: true
      }
    })
    this.props.updateSgroupInfo(this.state.infoModal.fields, groupId).then((group) => {
      this.setState({
        infoModal: {
          ...this.state.infoModal,
          loading: false,
          show: false
        }
      })
      message.success('更新成功')
    }).catch((e) => {
      this.setState({
        infoModal: {
          ...this.state.infoModal,
          loading: false
        }
      })
      message.error('更新失败')
    })
  }
  infoDateChange (date) {
    this.setState({
      infoModal: {
        ...this.state.infoModal,
        fields: {
          ...this.state.infoModal.fields,
          foundTime: date ? date.format() : null
        }
      }
    })
  }
  infoDescChange (e) {
    this.setState({
      infoModal: {
        ...this.state.infoModal,
        fields: {
          ...this.state.infoModal.fields,
          desc: e.target.value
        }
      }
    })
  }
  render () {
    console.log(this.state)
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
    let userAuths = _.get(this.props, 'userInfo.auth')
    let isAuthorized = AuthService.isAuthorized(userAuths)
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
              <h2>
                基本信息
                <Button
                  className='float-right vertical-middle'
                  shape="circle"
                  icon='edit'
                  onClick={this.toggleInfoModal.bind(this)}
                  size='large' />
              </h2>
              <Row className='align-center'>
                <Col lg={12} span={24}>
                  <Divider>社团名称</Divider>
                  <h2>{_.get(groupInfo, 'name')}</h2>
                </Col>
                <Col lg={12} span={24}>
                  <Divider>成立时间</Divider>
                  <Moment className={classnames({hide: !_.get(groupInfo, 'foundTime')})} locale="zh-cn" format="YYYY年MMMDo" fromNow>{_.get(groupInfo, 'foundTime')}</Moment>
                </Col>
                <Col span={24}>
                  <Divider>社团简介</Divider>
                  {_.get(groupInfo, 'desc')}
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
                      <Button className='icon-gap' onClick={this.refreshMemberList.bind(this)}>刷新</Button>
                      <Button
                        className={classnames('icon-gap', {
                          hide: !isAuthorized([{role: 'studentGroupPresident', groupId: groupId}])
                        })}
                        onClick={this.acceptNewMembers.bind(this, this.state.selectedRowKeys, groupId)}>
                        接受加入申请
                      </Button>
                      <Button
                        className={classnames('icon-gap', {
                          hide: !isAuthorized([{role: 'studentGroupPresident', groupId: groupId}])
                        })}
                        onClick={this.deleteMembers.bind(this, this.state.selectedRowKeys, groupId)} >
                        删除成员
                      </Button>
                      <Button
                        className={classnames({
                          hide: !isAuthorized([{role: 'studentGroupPresident', groupId: groupId}])
                        })}
                        onClick={this.rejectMembers.bind(this, this.state.selectedRowKeys, groupId)}>
                        拒绝加入申请
                      </Button>
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
        <Modal
          visible={this.state.infoModal.show}
          title='社团基本信息修改'
          onCancel={this.cancelInfoModal.bind(this)}
          footer={[
            <Button key="back" onClick={this.cancelInfoModal.bind(this)}>放弃修改</Button>,
            <Button key="submit" onClick={this.submitInfoModal.bind(this)} type="primary" loading={this.state.infoModal.loading}>
              提交修改
            </Button>,
          ]}>
          <Divider orientation="left">成立时间</Divider>
          <DatePicker allowClear={false} value={moment(this.state.infoModal.fields.foundTime)} placeholder="选择日期" onChange={this.infoDateChange.bind(this)} />
          <Divider orientation="left">社团简介</Divider>
          <TextArea autosize={{ minRows: 2, maxRows: 6 }} maxLength='200' onChange={this.infoDescChange.bind(this)} value={this.state.infoModal.fields.desc} />
        </Modal>
      </div>
    )
  }
}
