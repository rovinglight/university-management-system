import React, { Component } from 'react'
import { Row, Col, Button, Form, Input, Icon, Checkbox, Tabs, message, Table, Divider } from 'antd'
import _ from 'lodash'
import classnames from 'classnames'
import { isAuthorized } from '../../service/authService'
const FormItem = Form.Item
const TabPane = Tabs.TabPane;

import './SgroupAdmin.scss'

export default class SgroupAdmin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedRowKeys: []
    }
    props.getAllGroups()
  }
  onSelectChange (selectedRowKeys) {
    this.setState({ selectedRowKeys })
  }
  refreshMemberList () {
    this.props.getAllGroups().then((groups) => {
      message.success('刷新成功')
    })
  }
  render () {
    let groups = this.props.sgroups.groups
    console.log(this.props.sgroups)
    const columns = [{
      title: '名称',
      dataIndex: 'name',
    }, {
      title: '状态',
      dataIndex: 'status',
    }, {
      title: '年审',
      dataIndex: 'role'
    }, {
      title: '成立时间',
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
    return (
      <div className="sgroup-admin">
        <Row className="page-title">
          <Col>
            <h1>社团管理</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="shadow-box bg-white padding-20 margin-bottom-25">
              <h2 className="margin-bottom-25">全部社团</h2>
              <Row>
                <Col>
                  <Row className='margin-bottom-10'>
                    <Col>
                      <Button className='icon-gap' onClick={this.refreshMemberList.bind(this)}>刷新</Button>
                      <Button
                        className={classnames('icon-gap', {
                          hide: false
                        })}
                        onClick={console.log}>
                        解散社团
                      </Button>
                      <Button
                        className={classnames('icon-gap', {
                          hide: false
                        })}
                        onClick={console.log} >
                        发起年审
                      </Button>
                    </Col>
                  </Row>
                  <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={groups} />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
