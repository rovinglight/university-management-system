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

import './SgroupApproval.scss'

export default class SgroupApproval extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedRowKeys: [],
      sgroupModal: {
        visible: false,
        fields: {
          sgroupName: ''
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
        time: approval.startDate,
        todo: todoCount
      }
    })
  }
  createApproval () {
    let sgroupSchema = _.find(this.props.static.approvalSchema, {name: '新社团申请'})
    this.props.createApproval(sgroupSchema, this.state.sgroupModal.fields.sgroupName).then((approvalId) => {
      this.jumpTo(`/approval/detail/${approvalId}`)
      message.success('申请创建成功')
    }).catch((e) => {
      message.error('无法创建申请')
    })
  }
  toggleModal (modal) {
    this.setState({
      [modal]: {
        ...this.state[modal],
        visible: !this.state[modal].visible
      }
    })
  }
  render () {
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
      title: '社团名称',
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
      }
    }, {
      title: '操作',
      render: (text, record) => {
        return(
          <Link to={`/approval/detail/${record.key}`}>管理</Link>
        )
      }
    }]
    let tableData = this.tableDateGenerator('5af47419e72327010df05cd3')
    return (
      <div className="sgroup-approval">
        <Row className="page-title">
          <Col>
            <h1>
              新社团申请
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="shadow-box bg-white padding-20 margin-bottom-25">
              <h2>
                申办历史
                <Button
                  className='float-right vertical-middle'
                  shape="circle"
                  icon='plus'
                  onClick={this.toggleModal.bind(this, 'sgroupModal')}
                  size='large'/>
              </h2>
              <Row className='margin-bottom-10'>
                <Button className='icon-gap'>刷新</Button>
                <Button className='icon-gap'>删除</Button>
              </Row>
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={tableData} />
            </div>
          </Col>
        </Row>
        <Modal
          title="申请新社团"
          visible={this.state.sgroupModal.visible}
          onOk={this.createApproval.bind(this)}
          onCancel={this.toggleModal.bind(this, 'sgroupModal')}
        >
          <Input placeholder="社团名称" value={this.state.sgroupModal.fields.sgroupName} onChange={this.handleChange.bind(this, 'sgroupModal.fields.sgroupName')} />
        </Modal>
      </div>
    )
  }
}
