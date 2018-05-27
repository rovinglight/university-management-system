import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, List, Avatar, Modal, Divider, Input, message, Select, Popconfirm } from 'antd'
import classnames from 'classnames'
import authService from '../../service/authService'

import './UserInfo.scss'

export default class UserInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {

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
  render () {

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
                用户名
              </h2>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
