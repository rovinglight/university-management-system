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

import './Questions.scss'

export default class Questions extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedRowKeys: [],
      sgroupModal: {
        visible: false,
        fields: {
          sgroupName: ''
        }
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
    let fakeData = [
      {
        question: '老师你好，我是一名金融专业的学生，希望能够了解计算机专业外的学生是否能参加「互联网+」的比赛？',
        questioner: '测试学生账户'
      }, {
        question: '老师你好，是否所有学生都能够申请创立新社团，是否有年级限制？',
        questioner: '测试学生账户'
      }
    ]
    return (
      <div className="questions">
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
                全部问题
                <Button
                  className={classnames('float-right vertical-middle')}
                  shape="circle"
                  icon='plus'
                  size='large' />
              </h2>
              <Row>
                <Col className='padding-20'>
                  {
                    fakeData.map((item, index) => {
                      return (
                        <Card
                          onClick={this.jumpTo.bind(this, '/questions/detail/test')}
                          className='margin-bottom-10'
                          key={index}
                          hoverable
                          type="inner"
                          title={[<Avatar key='1' className={`vertical-middle icon-gap bg-gradient-${_.random(1, 10)}`} icon="user" />, <span key='2'>{item.questioner}</span>]}
                          extra={<Button>删除</Button>}
                        >
                          {item.question}
                        </Card>
                      )
                    })
                  }
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
