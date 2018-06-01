import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, List, Badge, Avatar, Modal, Divider, Input, message, Select, Popconfirm, Table } from 'antd'
import classnames from 'classnames'
import authService from '../../service/authService'
import Moment from 'react-moment'
import 'moment/locale/zh-cn'
import moment from 'moment';
const { TextArea } = Input
const Option = Select.Option

import './CompetitionsApproval.scss'

export default class CompetitionsApproval extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedRowKeys: []
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
  onSelectChange (selectedRowKeys) {
    this.setState({ selectedRowKeys })
  }
  todoCount (approval) {
    let badgeCount = 0
    let user = this.props.userInfo
    approval.status === 'processing' && _.find(approval.approvalProcess, (step, index) => {
      if (step.status === 'waiting' && _.find(user.auth, {role: step.role}) && approval.approvalProcess[index - 1].status === 'passed') {
        badgeCount ++
        for (let i = step.comment.length - 1; i >= 0; i--) {
          if (step.comment[i].commenter === user.name) {
            break
          }
          badgeCount ++
        }
        return true
      }
    })
    return badgeCount
  }
  tableDateGenerator (schemaId) {
    let user = this.props.userInfo
    let userId = this.props.userInfo._id
    let approvals = _.filter(this.props.approval.approvals, (approval) => {
      if (approval.schemaId !== schemaId) {
        return false
      }
      if (approval.sponsorId === userId) {
        return true
      }
      for (let i = 0; i < approval.approvalProcess.length; i++) {
        if (_.find(user.auth, {role: approval.approvalProcess[i].role})) {
          return true
        }
      }
    })
    let schemas = this.props.static
    return approvals.map((approval, index) => {
      let status = _.get(_.find(schemas.approvalStep.status, {status: approval.status}), 'display') || approval.status
      let todoCount = this.todoCount(approval)
      return {
        key: approval._id,
        name: approval.name,
        status: status,
        sponsor: approval.sponsorName,
        sponsorId: approval.sponsorId,
        time: approval.startDate,
        todo: todoCount
      }
    })
  }
  deleteApproval () {
    let approvalIdList = this.state.selectedRowKeys
    this.props.deleteApproval(approvalIdList).then((res) => {
      message.success('删除成功')
    }).catch((e) => {
      message.error('删除失败')
    })
  }
  deleteOneApproval (approvalId) {
    let approvalIdList = [approvalId]
    this.props.deleteApproval(approvalIdList).then((res) => {
      message.success('删除成功')
    }).catch((e) => {
      message.error('删除失败')
    })
  }
  render () {
    let isAuthorized = _.get(this.props, 'userInfo.isAuthorized') || (() => true)
    let user = this.props.userInfo
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange.bind(this),
      hideDefaultSelections: true,
      selections: false
    }
    let statusSchema = _.get(this.props.static, 'approvalStep.status')
    let statusFilter = statusSchema && statusSchema.map((status, i) => {
      return {
        text: status.display,
        value: status.display
      }
    })
    const columns = [{
      title: '竞赛名称',
      dataIndex: 'name',
    }, {
      title: '待办',
      render: (text, record) => {
        return (
          <Badge count={record.todo} />
        )
      },
      sorter: (a, b) => a.todo - b.todo,
    }, {
      title: '申请人',
      dataIndex: 'sponsor'
    }, {
      title: '状态',
      dataIndex: 'status',
      filters: statusFilter,
      onFilter: (value, record) => record.status.indexOf(value) === 0
    }, {
      title: '申请时间',
      render: (text, record) => {
        return (
          <Moment locale="zh-cn" format="YYYY年MMMDo，a hh:mm" fromNow>{record.time}</Moment>
        )
      },
      sorter: (a, b) => (new Date(a.time)).getTime() - (new Date(b.time)).getTime(),
    }, {
      title: '操作',
      render: (text, record) => {
        let actions = [
          <Link
            key='link'
            className={classnames({
              hide: !isAuthorized([
                {"role": "SecretaryOfYouthLeaguecommittee"},
                {"role": "DeputySecretaryOfYouthLeaguecommittee"},
                {"role": "teacher"},
                {"role": "competitionCommittee"}
              ]) && (user._id === record.sponsorId)
            })}
            to={`/approval/detail/${record.key}`}>
            管理
          </Link>
        ]
        if (record.sponsorId === user._id) {
          actions.push(<a key='a' onClick={this.deleteOneApproval.bind(this, record.key)}><Divider type="vertical" />删除</a>)
        }
        return(actions)
      }
    }]
    let tableData = this.tableDateGenerator('5af450afe72327010df04c80')
    return (
      <div className="competition-approval">
        <Row className="page-title">
          <Col>
            <h1>
              竞赛申办
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="shadow-box bg-white padding-20 margin-bottom-25">
              <h2>
                全部申请
                <Link to='/competitions'>
                  <Button
                    className={classnames('float-right vertical-middle', {
                      hide: !isAuthorized([{role: 'teacher'}])
                    })}
                    shape="circle"
                    icon='plus'
                    size='large'/>
                </Link>
              </h2>
              <Row className='margin-bottom-10'>
                <Button className='icon-gap'>刷新</Button>
                <Button
                  className={classnames('icon-gap', {
                    hide: !isAuthorized([])
                  })}
                  onClick={this.deleteApproval.bind(this)}>
                  删除
                </Button>
              </Row>
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={tableData} />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
