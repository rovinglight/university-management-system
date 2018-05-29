import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, List, Avatar, Modal, Input, message, Select, Icon, Pagination } from 'antd'
import classnames from 'classnames'
import authService from '../../service/authService'
const { TextArea } = Input
const Option = Select.Option

import './Projects.scss'

export default class Projects extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cpModal: {
        show: false,
        loading: false,
        fields: {}
      }
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
  render () {
    console.log(this.state)
    const listData = []
    for (let i = 0; i < 23; i++) {
      listData.push({
        href: 'http://ant.design',
        title: `测试项目 ${i}`,
        description: '此处为项目的简述部分，应叙述项目目标，应小于25个字。',
        content: '此处为项目简介部分，相对于简述应当更加详细，可以扩展叙述项目目标，实现方法，所用技术以及成员要求等一系列信息，字数不超过100为佳',
      });
    }
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    )
    return (
      <div className="projects">
        <Row className="page-title">
          <Col>
            <h1>项目库</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="shadow-box bg-white padding-20 margin-bottom-25">
              <h2>
                所有项目
                <Button
                  className={classnames('float-right vertical-middle')}
                  shape="circle"
                  icon='plus'
                  size='large' />
              </h2>
              <Row>
                <Col>
                  <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                      onChange: (page) => {
                        console.log(page);
                      },
                      pageSize: 3,
                    }}
                    dataSource={listData}
                    renderItem={item => (
                      <List.Item
                        key={item.title}
                        actions={[<IconText type="team" text="5" />, <a>申请加入</a>, <a>管理</a>]}
                      >
                        <List.Item.Meta
                          avatar={<Avatar src={item.avatar} />}
                          title={<a href={item.href}>{item.title}</a>}
                          description={item.description}
                        />
                        {item.content}
                      </List.Item>
                    )}
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
