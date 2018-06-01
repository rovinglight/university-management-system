import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, List, Badge, Avatar, Modal, Divider, Input, message, Select, Icon, Table, Card, Rate } from 'antd'
import classnames from 'classnames'
import authService from '../../service/authService'
import Moment from 'react-moment'
import 'moment/locale/zh-cn'
import moment from 'moment';
const { TextArea } = Input
const Option = Select.Option
const Search = Input.Search

import './Statistics.scss'

export default class Statistics extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchButtonLoading: false,
      targetUser: {},
      sgroupData: [],
      competitionData: []
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
  searchForUser (value) {
    this.setState({searchButtonLoading: true, searchResults: []})
    authService.searchUser(value).then((result) => {
      message.success('搜索完成')
      this.setState({searchButtonLoading: false, searchResults: result})
    }).catch((e) => {
      message.error('未找到用户')
      this.setState({searchButtonLoading: false})
    })
  }
  setTargetUser (userInfo) {
    this.setState({
      targetUser: userInfo,
      sgroupData: this.sgroupDataGenerator(userInfo._id),
      competitionData: this.competitionDataGenerator(userInfo._id)
    })
  }
  competitionDataGenerator (studentId) {
    let user = _.get(this.props, 'userInfo')
    let approvals = _.get(this.props, 'approval.approvals') || []
    let data = _.filter(approvals, (approval) => {
      console.log()
      if (approval.schemaId === '5b11af07887498cccea7d20e' && approval.sponsorId === studentId) {
        return true
      }
      return false
    })
    return data.map((item, index) => {
      return {
        key: index,
        name: item.name,
        status: item.status,
        startTime: item.startTime
      }
    })
  }
  sgroupDataGenerator (studentId) {
    let allroles = this.props.static.allroles
    let groups = this.props.sgroups.groups
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
    let result = []
    groups.forEach((group, index) => {
      if (!_.find(group.members, {studentId: studentId})) {
        return
      }
      let memberInfo = _.find(group.members, {studentId: studentId})
      memberInfo = _.cloneDeep(memberInfo)
      memberInfo.groupInfo = group
      memberInfo.role = _.get(_.find(allroles, {role: memberInfo.role}), 'display')
      memberInfo.status = _.get(_.find(statusConverter, {status: memberInfo.status}), 'display')
      memberInfo.key = index
      memberInfo && result.push(memberInfo)
    })
    return result
  }
  showAudit (audit) {
    console.log(audit)
  }
  render () {
    console.log(this.state)
    let targetUser = this.state.targetUser
    const sgroupColumns = [{
      title: '社团名称',
      dataIndex: 'groupInfo.name',
      key: 'groupInfo.name',
      render: (text, record) => <Link to={`/studentgroups/manage/${record.groupInfo._id}`}>{text}</Link>
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
    }, {
      title: '上次年审结果',
      dataIndex: '',
      key: '',
      render: (text, record) => (
         <Rate
           disabled
           className={classnames('hover', {hide: !record.audit[record.audit.length - 1]})}
           value={_.get(record.audit[record.audit.length - 1], 'rate')} />
      )
    }, {
      title: '加入时间',
      dataIndex: 'joinTime',
      key: 'joinTime',
      render: text => {
        if (text) {
          return (<Moment locale="zh-cn" format="YYYY年MMMDD日，a hh:mm" fromNow>{text}</Moment>)
        }
        return ''
      }
    }]
    const competitionColums = [
      {
        title: '竞赛名称',
        dataIndex: 'name'
      }, {
        title: '状态',
        dataIndex: 'status'
      }, {
        title: '参赛时间',
        dataIndex: 'startTime',
        render: (text, record) => (
          <Moment locale="zh-cn" format="YYYY年MMMDD日，a hh:mm" fromNow>{record.startTime}</Moment>
        )
      }
    ]
    return (
      <div className="statistics">
        <Row className="page-title">
          <Col>
            <h1>
              学生数据统计
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="shadow-box bg-white padding-20 margin-bottom-25">
              <h2>
                学生信息
              </h2>
              <Row>
                <Col className='padding-20'>
                  <Search
                    autoFocus
                    placeholder="用户搜索"
                    onSearch={this.searchForUser.bind(this)}
                    enterButton={<Icon type={this.state.searchButtonLoading ? "loading" : "search"} />}
                  />
                  <List
                    itemLayout="horizontal"
                    size="large"
                    dataSource={this.state.searchResults}
                    renderItem={item => (
                      <List.Item
                        onClick={this.setTargetUser.bind(this, item)}
                        className='hover'
                        style={{'textAlign': 'left'}}
                        key={item.title}
                        actions={[<Icon type="right" />]}
                      >
                        <List.Item.Meta
                          avatar={<Avatar className={`vertical-middle icon-gap margin-left-10 bg-gradient-${_.random(1, 10)}`} icon="user" />}
                          title={item.name}
                          description={item.user}
                        />
                      </List.Item>
                    )}
                  />
                  <Divider/>
                  <Card className={classnames({hide: !targetUser.name})}>
                    <p>{`姓名: ${targetUser.name}`}</p>
                    <p>住址: {targetUser.address}</p>
                    <p>电话: {targetUser.phoneNumber}</p>
                    <p>性别: {targetUser.gender}</p>
                    <p>出生日期: {targetUser.birthDate}</p>
                    <p>民族: {targetUser.ethnic}</p>
                    <p>学号: {targetUser.user}</p>
                  </Card>
                </Col>
              </Row>
            </div>
          </Col>
          <Col>
            <div className="shadow-box bg-white padding-20 margin-bottom-25">
              <h2>
                社团数据
              </h2>
              <Row>
                <Col className='padding-20'>
                  <Table columns={sgroupColumns} dataSource={this.state.sgroupData} />
                </Col>
              </Row>
            </div>
          </Col>
          <Col>
            <div className="shadow-box bg-white padding-20 margin-bottom-25">
              <h2>
                竞赛数据
              </h2>
              <Row>
                <Col className='padding-20'>
                  <Table columns={competitionColums} dataSource={this.state.competitionData} />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
