import React, { Component } from 'react'
import { Row, Col, Button } from 'antd'

import './StudentGroups.scss'

export default class StudentGroups extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div className="studentgroups">
        <Row className="page-title">
          <Col>
            <h1>全部社团</h1>
          </Col>
        </Row>
        <Row gutter={24}>

          <Col span={24} xl={12}>
            <div className="group-card shadow-box">
              <Row type="flex">
                <Col xs={24} sm={6}>
                  <Row
                    className="group-card-left bg-gradient-5"
                    type="flex"
                    justify="center"
                    align="middle">
                    <Col>“习近平治国理政思想”读书社“</Col>
                  </Row>
                </Col>
                <Col className="padding-20 group-card-right" xs={24} sm={18}>
                  <Row>
                    <Col>成立时间：2017年5月11日</Col>
                  </Row>
                  <Row>
                    <Col>成员数：112人</Col>
                  </Row>
                  <Row>
                    <Col>简介：集美大学学生法学社是经校团委审批的、受集美大学学生社团联合会指导的，系法律爱好者自愿结合的一个以法学学术性为主，集学术、实践及法律援助于一身的学生社团。社团以“弘扬法律精神，增强法治理念，探讨法律问题，提高法学素养”为宗旨，长期致力于法律服务工作，提供法律援助，进行法制宣传，努力成为一个有一定素养和专业的社团。社团组织开展了学术沙龙、模拟法庭表演、模拟法庭比赛、法律咨询、法律知识竞赛、案例讨论、校内外普法等一系列活动。</Col>
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
          </Col>

        </Row>
      </div>
    )
  }
}
