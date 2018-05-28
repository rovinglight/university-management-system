import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, List, Avatar, Modal, Divider, Input, message, Select, Popconfirm, Card } from 'antd'
import classnames from 'classnames'
import authService from '../../service/authService'

import './UserInfo.scss'

export default class UserInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editModal: {
        visible: false,
        fields: {

        }
      }
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
      value: user.birthDate
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
                  <List
                    grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
                    dataSource={data}
                    renderItem={item => (
                      <List.Item>
                        <Card style={{textAlign:'center'}} type='inner' hoverable title={item.title}>{item.value}</Card>
                      </List.Item>
                    )}
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Modal
          title="编辑用户信息"
          visible={this.state.editModal.visible}
          onOk={this.submitEdit}
          onCancel={this.toggleModal.bind(this, 'editModal')}
        >

        </Modal>
      </div>
    )
  }
}
