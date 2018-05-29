import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, List, Avatar, Modal, Divider, Input, message, Select, Popconfirm, Card } from 'antd'
import classnames from 'classnames'
import authService from '../../service/authService'

import './ToDo.scss'

export default class ToDo extends Component {
  constructor (props) {
    super(props)
    this.state = {

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
  toggleModal (modal) {
    this.setState({
      [modal]: {
        ...this.state[modal],
        visible: !this.state[modal].visible
      }
    })
  }
  render () {
    return (
      <div className="todo">
        <Row className="page-title">
          <Col>
            <h1>
              待办事项
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="shadow-box bg-white padding-20 margin-bottom-25">
              <h2>
                待办统计
              </h2>
              <Row>
                <Col className='padding-20'>
                  <Row type='flex' gutter={24}>
                    <Col sm={8} span={24}>
                      <Card onClick={this.jumpTo.bind(this, '/competitions/approval')} bordered={false} className={classnames('bg-light-green box-container hover', {})}>
                        <span className='count'>5</span>
                        <p>竞赛申办审批</p>
                      </Card>
                    </Col>
                    <Col sm={8} span={24}>
                      <Card onClick={this.jumpTo.bind(this, '/studentgroups/new/approval')} bordered={false} className={classnames('bg-light-blue box-container hover', {})}>
                        <span className='count'>4</span>
                        <p>新社团申请审批</p>
                      </Card>
                    </Col>
                    <Col sm={8} span={24}>
                      <Card onClick={this.jumpTo.bind(this, '/questions')} bordered={false} className={classnames('bg-light-purple box-container hover', {})}>
                        <span className='count'>0</span>
                        <p>在线问答</p>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
