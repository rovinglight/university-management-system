import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, List, Badge, Avatar, Modal, Divider, Input, message, Select, Popconfirm, Card } from 'antd'
import classnames from 'classnames'
import authService from '../../service/authService'
import Moment from 'react-moment'
import 'moment/locale/zh-cn'
import moment from 'moment';
const { TextArea } = Input
const Option = Select.Option

import './QuestionDetail.scss'

export default class QuestionDetail extends Component {
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
  render () {
    let fakeData = [
      {
        responsor: '测试学生账户',
        content: '老师你好，我是一名金融专业的学生，希望能够了解计算机专业外的学生是否能参加「互联网+」的比赛？'
      }, {
        responsor: '团委老师',
        content: '互联网+比赛不限制参赛专业，有意愿即可报名'
      }, {
        responsor: '测试学生账户',
        content: '谢谢老师'
      }
    ]
    return (
      <div className="question-detail">
        <Row className="page-title">
          <Col>
            <h1>
              在线问答
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="shadow-box bg-white padding-20 margin-bottom-25">
              <h2>
                问题详情
              </h2>
              <Row>
                <Col className='padding-20'>
                  {
                    fakeData.map((item, index) => {
                      return (
                        <Row className='margin-bottom-10' key={index} type='flex' gutter={6}>
                          <Col md={2} span={24}>
                            <Avatar className={`vertical-middle icon-gap bg-gradient-${_.random(1, 10)}`} icon="user" />
                            <p>{item.responsor}</p>
                          </Col>
                          <Col md={22} span={24}>
                            <Card>
                              <p>{item.content}</p>
                            </Card>
                          </Col>
                        </Row>
                      )
                    })
                  }
                </Col>
                <Col className='padding-20'>
                  <Row>
                    <Col>
                      <TextArea
                        className='margin-bottom-10'
                        autosize={{ minRows: 2, maxRows: 6 }}
                        placeholder='意见' />
                    </Col>
                  </Row>
                  <Row type='flex' justify='center'>
                    <Col>
                      <Button className='icon-gap'>
                        提交
                      </Button>
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
