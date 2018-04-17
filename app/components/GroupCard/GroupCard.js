import React, { Component } from 'react'
import { Row, Col, Button } from 'antd'
import _ from 'lodash'

import './GroupCard.scss'

export default class GroupCard extends Component {
  constructor (props) {
    super(props)
    let randomNum = _.random(1, 10)
    this.state = {
      randomNum: randomNum
    }
  }
  render () {
    let group = this.props.group
    let memberCount = group.members.length
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
                <Col>成立时间：{group.foundTime}</Col>
              </Row>
              <Row>
                <Col>成员数：{memberCount}</Col>
              </Row>
              <Row>
                <Col>简介：{group.desc}</Col>
              </Row>
              <Row type="flex" justify="end" gutter={16}>
                <Col>
                  <Button type="default">申请加入</Button>
                </Col>
                <Col>
                  <Button type="default">社团管理</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
    )
  }
}
