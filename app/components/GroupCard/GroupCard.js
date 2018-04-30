import React, { Component } from 'react'
import { Row, Col, Button, Icon } from 'antd'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import Moment from 'react-moment'
import 'moment/locale/zh-cn'
import classnames from 'classnames'
import AuthService from '../../service/authService'

import './GroupCard.scss'

export default class GroupCard extends Component {
  constructor (props) {
    super(props)
    let randomNum = _.random(1, 10)
    this.state = {
      randomNum: randomNum,
      applyButtonLoading: false
    }
  }
  applyForSgroup () {
    let userId = this.props.userId
    let groupId = this.props.group._id
    if (!userId) {
      return this.props.jumpTo('/login')
    }
    this.setState({applyButtonLoading: true})
    this.props.applyForSgroup(userId, groupId).then((res) => {
      this.setState({applyButtonLoading: false})
    }).catch((e) => {
      this.setState({applyButtonLoading: false})
      console.log(e)
    })
  }
  render () {
    let userId = this.props.userId
    let group = this.props.group
    let memberCount = (_.filter(group.members, {status: 'active'})).length
    let groupMemberInfo = _.find(group.members, _.matchesProperty('studentId', userId))
    let userAuths = _.get(this.props, 'userInfo.auth')
    let isAuthorized = AuthService.isAuthorized(userAuths)
    return (
        <div className="group-card shadow-box">
          <Row type="flex">
            <Col xs={24} sm={6}>
              <Row
                className={`group-card-left bg-gradient-${this.state.randomNum}`}
                type="flex"
                justify="center"
                align="middle">
                <Col>{group.name}</Col>
              </Row>
            </Col>
            <Col className="padding-20 group-card-right" xs={24} sm={18}>
              <Row>
                <Col>成立时间：<Moment className={classnames({hide: !group.foundTime})} locale="zh-cn" format="YYYY年MMMDo" fromNow>{group.foundTime}</Moment></Col>
              </Row>
              <Row>
                <Col>成员数：{memberCount}</Col>
              </Row>
              <Row>
                <Col>简介：{group.desc}</Col>
              </Row>
              <Row type="flex" justify="end" gutter={16}>
                <Col className={classnames({hide: !(isAuthorized([{role: 'studentGroupMember', groupId: group._id}]))})}>
                  <Link to={`/studentgroups/manage/${group._id}`}>
                    <Button type="default">社团管理</Button>
                  </Link>
                </Col>
                <Col>
                  <Button
                    className={classnames({
                      hide: isAuthorized([{role: 'studentGroupMember', groupId: group._id}, {role: 'studentGroupApplicant', groupId: group._id}]) || !group.acceptionStatus
                    })}
                    loading={this.state.applyButtonLoading}
                    onClick={this.applyForSgroup.bind(this)}
                    type="default">
                    申请加入
                  </Button>
                  <span
                    className={classnames({
                      hide: !(isAuthorized([{role: 'studentGroupApplicant', groupId: group._id}], false))
                    })}>
                    <Icon className='icon-gap' type="clock-circle-o" />
                    申请状态：等待通过
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
    )
  }
}
