import React, { Component } from 'react'
import { Row, Col, Button } from 'antd'

import './Approval.scss'

export default class Approval extends Component {
  constructor (props) {
    super(props)
  }
  jumpTo (path) {
    this.props.history.push(path)
  }
  render () {
    return (
      <div className="approval">
        <Row className="page-title">
          <Col>
            <h1>审批</h1>
          </Col>
        </Row>
      </div>
    )
  }
}
