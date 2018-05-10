import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, List, Avatar, Modal, Divider, Input, message, Select, Popconfirm, Table } from 'antd'
import classnames from 'classnames'
import authService from '../../service/authService'
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
  render () {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange.bind(this),
      hideDefaultSelections: true,
      selections: false
    }
    const columns = [{
      title: '竞赛名称',
      dataIndex: 'name',
    }, {
      title: '状态',
      dataIndex: 'status',
    }, {
      title: '申请时间',
      dataIndex: 'time'
    }, {
      title: '操作',
      render: (text, record) => {
        return(
          <Link to='/approval/competitions/test'>管理</Link>
        )
      }
    }]
    const competitions = [{
      name: '“互联网+”大学生创新创业大赛',
      status: '申请中',
      time: '三天前'
    }]
    return (
      <div className="competition-approval">
        <Row className="page-title">
          <Col>
            <h1>竞赛申办</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="shadow-box bg-white padding-20 margin-bottom-25">
              <h2>
                申办历史
              </h2>
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={competitions} />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
