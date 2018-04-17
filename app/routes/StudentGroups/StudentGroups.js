import React, { Component } from 'react'
import { Row, Col } from 'antd'

import './StudentGroups.scss'

export default class StudentGroups extends Component {
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
              <Row>
                <Col xs={24} sm={6}>
                  <div className="group-card-left bg-gradient-5"></div>
                </Col>
                <Col span={18}>
                  <div></div>
                </Col>
              </Row>
            </div>
          </Col>

          <Col span={24} xl={12}>
            <div className="group-card shadow-box">
              <Row>
                <Col xs={24} sm={6}>
                  <div className="group-card-left bg-gradient-3"></div>
                </Col>
                <Col span={18}>
                  <div></div>
                </Col>
              </Row>
            </div>
          </Col>

          <Col span={24} xl={12}>
            <div className="group-card shadow-box">
              <Row>
                <Col xs={24} sm={6}>
                  <div className="group-card-left bg-gradient-5"></div>
                </Col>
                <Col span={18}>
                  <div></div>
                </Col>
              </Row>
            </div>
          </Col>

        </Row>
      </div>
    )
  }
}
