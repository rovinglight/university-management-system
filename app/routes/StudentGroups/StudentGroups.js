import React, { Component } from 'react'
import { Row, Col, Button } from 'antd'
import GroupCard from '../../components/GroupCard/GroupCard'

import './StudentGroups.scss'

export default class StudentGroups extends Component {
  constructor (props) {
    super(props)
    props.getAllGroups()
  }
  render () {
    let groups = this.props.sgroups.groups
    let userId = _.get(this.props, 'userInfo._id')
    console.log(userId)
    return (
      <div className="studentgroups">
        <Row className="page-title">
          <Col>
            <h1>全部社团</h1>
          </Col>
        </Row>
        <Row gutter={24}>
          {
            groups.map((group, index) => {
              return (
                <Col key="index" span={24} xl={12}>
                  <GroupCard group={group} userId={userId} applyForSgroup={this.props.applyForSgroup} />
                </Col>
              )
            })
          }
        </Row>
      </div>
    )
  }
}
