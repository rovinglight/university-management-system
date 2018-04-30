import React, { Component } from 'react'
import { Row, Col, Button, Form, Input, Icon, Checkbox, Tabs, message, Table, Divider } from 'antd'
import _ from 'lodash'
import classnames from 'classnames'
import { isAuthorized } from '../../service/authService'
const FormItem = Form.Item
const TabPane = Tabs.TabPane
import Moment from 'react-moment'
import 'moment/locale/zh-cn'
import moment from 'moment';
const ButtonGroup = Button.Group;

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
  isNoneSelected () {
    if (this.state.selectedRowKeys.length === 0) {
      return true
    }
    return false
  }
  toggleAcceptionStatus (newStatus) {
    if (this.isNoneSelected()) {
      return message.error('未选中社团')
    }
    this.props.changeAcceptionStatus(this.state.selectedRowKeys, newStatus).then(() => {
      message.success('纳新状态修改成功')
    }).catch((e) => {
      console.log(e)
      message.error('纳新状态修改失败')
    })
  }
  groupDataConverter (groups) {
    const acceptionStatusConverter = [{
      status: true,
      desc: '正在进行'
    }, {
      status: false,
      desc: '停止纳新'
    }]
    groups = groups.map((group, index) => {
      let acceptionStatus = _.find(acceptionStatusConverter, {status: group.acceptionStatus})
      return({
        key: group._id,
        name: group.name,
        status: group.status,
        auditStatus: group.auditStatus,
        foundTime: group.foundTime,
        acceptionStatus: acceptionStatus.desc
      })
    })
    return groups
  }
  render () {
    console.log(this.state)
    let groups = this.groupDataConverter(this.props.sgroups.groups)
    const columns = [{
      title: '名称',
      dataIndex: 'name',
    }, {
      title: '状态',
      dataIndex: 'status',
    }, {
      title: '年审',
      dataIndex: 'auditStatus'
    }, {
      title: '纳新',
      dataIndex: 'acceptionStatus'
    }, {
      title: '成立时间',
      render: (text, record) => {
        if (!record.foundTime) {
          return
        }
        return(
          <Moment locale="zh-cn" format="MMMDo YYYY，a" fromNow>{record.foundTime}</Moment>
        )
      }
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
                      <ButtonGroup>
                        <Button
                          className={classnames({
                            hide: false
                          })}
                          onClick={this.toggleAcceptionStatus.bind(this, true)} >
                          开启纳新
                        </Button>
                        <Button
                          className={classnames({
                            hide: false
                          })}
                          onClick={this.toggleAcceptionStatus.bind(this, false)} >
                          关闭纳新
                        </Button>
                      </ButtonGroup>
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
