import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, List, Avatar, Modal, Divider, DatePicker, Input, message, Select, Popconfirm, Card, Form } from 'antd'
import classnames from 'classnames'
import authService from '../../service/authService'
import Moment from 'react-moment'
import 'moment/locale/zh-cn'
import moment from 'moment'
const FormItem = Form.Item

import './UserInfo.scss'

export default class UserInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editModal: {
        visible: false,
        fields: {
          _id: '',
          birthDate: '',
          phoneNumber: ''
        }
      }
    }
  }
  componentDidUpdate () {
    let userInfo = this.props.userInfo
    if (this.state.editModal.fields._id !== userInfo._id) {
      let newState = _.cloneDeep(this.state)
      newState.editModal.fields = {
        _id: userInfo._id,
        birthDate: userInfo.birthDate,
        phoneNumber: userInfo.phoneNumber
      }
      this.setState(newState)
    }
  }
  handleChange (path, result) {
    if (_.get(result, 'target')) {
      result = result.target.value
    }
    let newState = _.cloneDeep(this.state)
    _.set(newState, path, result)
    this.setState(newState)
  }
  toggleModal (modal) {
    this.setState({
      [modal]: {
        ...this.state[modal],
        visible: !this.state[modal].visible
      }
    })
  }
  submitUpdate () {
    this.props.updateUserInfo(this.state.editModal.fields).then((res) => {
      message.success('更新成功')
      this.toggleModal('editModal')
    }).catch((e) => {
      message.error('更新失败')
    })
  }
  render () {
    let user = this.props.userInfo
    let data = [{
      title: '学号/工号',
      value: user.user
    }, {
      title: '性别',
      value: user.gender
    }, {
      title: '出生日期',
      value: <Moment locale="zh-cn" format="YYYY年MMMDo">{user.birthDate}</Moment>
    }, {
      title: '身份证号',
      value: user.CIdNumber
    }, {
      title: '民族',
      value: user.ethnic
    }, {
      title: '家庭住址',
      value: user.address
    }, {
      title: '手机号',
      value: user.phoneNumber
    }]
    return (
      <div className="userinfo">
        <Row className="page-title">
          <Col>
            <h1>
              用户信息
            </h1>
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
                  onClick={this.toggleModal.bind(this, 'editModal')}
                  size='large'/>
              </h2>
              <Row>
                <Col className='padding-20'>
                  <Row gutter={0}>
                    {
                      data.map((item, index) => {
                        return(
                          <Col span={24} lg={8} key={index}>
                            <Card.Grid style={{width:'100%', textAlign: 'center'}}>
                              <Divider>{item.title}</Divider>
                              {item.value}
                            </Card.Grid>
                          </Col>
                        )
                      })
                    }
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Modal
          title="编辑用户信息"
          visible={this.state.editModal.visible}
          onOk={this.submitUpdate.bind(this)}
          onCancel={this.toggleModal.bind(this, 'editModal')}
        >
          <FormItem label='出生日期'>
            <DatePicker onChange={this.handleChange.bind(this, 'editModal.fields.birthDate')} defaultValue={moment(this.state.editModal.fields.birthDate)} />
          </FormItem>
          <FormItem label='手机号码'>
            <Input value={this.state.editModal.fields.phoneNumber} onChange={this.handleChange.bind(this, 'editModal.fields.phoneNumber')} />
          </FormItem>
        </Modal>
      </div>
    )
  }
}
