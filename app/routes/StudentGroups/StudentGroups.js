import React, { Component } from 'react'
import { Row, Col, Button } from 'antd'
import GroupCard from '../../components/GroupCard/GroupCard'

import './StudentGroups.scss'

export default class StudentGroups extends Component {
  constructor (props) {
    super(props)
    props.getAllGroups()
  }
  jumpTo (path) {
    this.props.history.push(path)
  }
  render () {
    let groups = this.props.sgroups.groups
    let userId = _.get(this.props, 'userInfo._id')
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
                <Col key={index} span={24} xxl={12}>
                  <GroupCard
                    group={group}
                    userId={userId}
                    userInfo={this.props.userInfo}
                    applyForSgroup={this.props.applyForSgroup}
                    jumpTo={this.jumpTo.bind(this)} />
                </Col>
              )
            })
          }
        </Row>
      </div>
    )
  }
}
