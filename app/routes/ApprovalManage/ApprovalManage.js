import React, { Component } from 'react'
import { Row, Col, Button } from 'antd'
import GroupCard from '../../components/GroupCard/GroupCard'

import './ApprovalManage.scss'

export default class ApprovalManage extends Component {
  constructor (props) {
    super(props)
  }
  jumpTo (path) {
    this.props.history.push(path)
  }
  render () {
    let groups = this.props.sgroups.groups
    let userId = _.get(this.props, 'userInfo._id')
    //根据 object对象的path路径获取值
    //_.get(object, path, [defaultValue])
    //object (Object): 要检索的对象。path (Array|string): 要获取属性的路径。
    return (
      <div className="approval-manage">
        <Row className="page-title">
          <Col>
            <h1>动态审核设置</h1>
          </Col>
        </Row>
      </div>
    )
  }
}
