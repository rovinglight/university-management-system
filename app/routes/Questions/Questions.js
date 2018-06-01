import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, List, Badge, Avatar, Modal, Divider, Input, message, Select, Popconfirm, Card, Form } from 'antd'
import classnames from 'classnames'
import authService from '../../service/authService'
import Moment from 'react-moment'
import 'moment/locale/zh-cn'
import moment from 'moment';
const { TextArea } = Input
const FormItem = Form.Item

import './Questions.scss'

export default class Questions extends Component {
  constructor (props) {
    super(props)
    this.state = {
      newModal: {
        visible: false,
        fields: {
          question: ''
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
  toggleModal () {
    this.setState({
      newModal: {
        ...this.state.newModal,
        fields: {
          question: ''
        },
        visible: !this.state.newModal.visible
      }
    })
  }
  submitModal () {
    let question = this.state.newModal.fields
    _.assign(question, {
      questionerName: this.props.userInfo.name,
      questionerId: this.props.userInfo._id,
      time: new Date()
    })
    this.props.upsertQuestion(question).then((res) => {
      message.success('提交成功')
      this.toggleModal()
    }).catch((e) => {
      message.error('提交失败')
    })
  }
  deleteQuestion (questionId, e) {
    e.stopPropagation()
    this.props.deleteQuestion(questionId).then((res) => {
      message.success('删除成功')
    }).catch((e) => {
      message.error('删除失败')
    })
  }
  render () {
    let questions = this.props.question.questions
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
                  onClick={this.toggleModal.bind(this)}
                  className={classnames('float-right vertical-middle')}
                  shape="circle"
                  icon='plus'
                  size='large' />
              </h2>
              <Row>
                <Col className='padding-20'>
                  {
                    questions.map((item, index) => {
                      return (
                        <Card
                          onClick={this.jumpTo.bind(this, `/questions/detail/${item._id}`)}
                          className='margin-bottom-10'
                          key={index}
                          hoverable
                          type="inner"
                          title={[<Avatar key='1' className={`vertical-middle icon-gap bg-gradient-${_.random(1, 10)}`} icon="user" />, <span key='2'>{item.questionerName}</span>]}
                          extra={[
                            <Moment className='icon-gap' key='2' locale="zh-cn" format="YYYY年MMMDo，a hh:mm" fromNow>{item.time}</Moment>,
                            <Button onClick={this.deleteQuestion.bind(this, item._id)} key='1'>删除</Button>
                          ]}
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
        <Modal
          visible={this.state.newModal.visible}
          title='新建问题'
          onCancel={this.toggleModal.bind(this)}
          footer={[
            <Button key="back" onClick={this.toggleModal.bind(this)}>放弃创建</Button>,
            <Button key="submit" onClick={this.submitModal.bind(this)} type="primary">
              创建问题
            </Button>,
          ]}>
          <FormItem label='问题内容'>
            <TextArea value={this.state.newModal.fields.question} onChange={this.handleChange.bind(this, 'newModal.fields.question')} />
          </FormItem>
        </Modal>
      </div>
    )
  }
}
