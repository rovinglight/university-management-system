import React, { Component } from 'react'
import { Row, Col, Modal, Input, message } from 'antd'
import { Link } from 'react-router-dom'

import './profile.scss'
const avatar = require('./image/avatar.jpg')

export default class Profile extends Component {

  constructor (props) {
    super(props)
    this.state = {
      quizCounter : 1,
      register: {
        show: false,
        user: '',
        pwd: ''
      },
      login: {
        show: false,
        user: '',
        pwd: ''
      }
    }
  }
  componentWillMount () {
    this.props.clearList()
  }
  quizCountChange (type) {
    let newCount = this.state.quizCounter
    if (type === 'increase') {
      newCount += 1
    } else {
      newCount -= 1
      newCount = newCount < 1 ? 1 : newCount
    }
    this.setState({
      quizCounter : newCount
    })
  }
  createQuiz () {
    this.props.createQuiz(this.state.quizCounter, () => {
      this.jumpTo('quizList')
    })
  }
  jumpTo (path) {
    this.props.history.push(path)
  }
  register () {
    let user = this.state.register.user
    let pwd = this.state.register.pwd
    if (!user || !pwd) {
      return message.warning('UserName or PassWord are required')
    }
    this.props.register(user, pwd).then(() => {
      message.success('register success')
    }).catch(() => {
      message.error('register fail')
    })
  }
  login () {
    let user = this.state.login.user
    let pwd = this.state.login.pwd
    if (!user || !pwd) {
      return message.warning('UserName or PassWord are required')
    }
    this.props.login(user, pwd).then(() => {
      message.success('login success')
    }).catch(() => {
      message.error('login fail')
    })
  }
  toggleModal (type) {
    this.setState({
      [type]:{
        ...this.state[type],
        show: !this.state[type].show
      }
    })
  }
  handleOk (type) {
    if (type === 'login') {
      this.login()
      this.toggleModal('login')
    } else {
      this.register()
      this.toggleModal('register')
    }
  }
  handleInputChange (type, input, e) {
    this.setState({
      ...this.state,
      [type]: {
        ...this.state[type],
        [input]: e.target.value
      }
    })
  }
  render () {
    console.log(this.state)
    return (
      <div className='profile'>
        <Modal
          title="Login"
          visible={this.state.login.show}
          onOk={this.handleOk.bind(this, 'login')}
          onCancel={this.toggleModal.bind(this, 'login')}>
          UserName:<Input value={this.state.login.user} onChange={this.handleInputChange.bind(this, 'login', 'user')} />
          Password:<Input value={this.state.login.pwd} onChange={this.handleInputChange.bind(this, 'login', 'pwd')} />
        </Modal>
        <Modal
          title="Register"
          visible={this.state.register.show}
          onOk={this.handleOk.bind(this, 'register')}
          onCancel={this.toggleModal.bind(this, 'register')}>
          UserName:<Input value={this.state.register.user} onChange={this.handleInputChange.bind(this, 'register', 'user')} />
          Password:<Input value={this.state.register.pwd} onChange={this.handleInputChange.bind(this, 'register', 'pwd')} />
        </Modal>
        <Row type='flex' align='middle' className='profile-container'>
          <Col span={24}>
            <Row type='flex' justify='space-around' align='middle'>
              <Col xs={20} sm={4}>
                <img src={avatar} className='user-avatar'/>
                <div className='user-name'>{this.props.userInfo.user}</div>
                <div className='data-panel shadow-box'>
                  Total : {this.props.userInfo.total}
                </div>
              </Col>
              <Col xs={20} sm={12}>
                <Row className='user-action'>
                  <Col xs={24} sm={12}>
                    <button className='btn btn-blue min-width-200' onClick={this.toggleModal.bind(this, 'login')}>Login</button>
                  </Col>
                  <Col xs={24} sm={12}>
                    <button className='btn btn-blue min-width-200' onClick={this.toggleModal.bind(this, 'register')}>Register</button>
                  </Col>
                </Row>
                <div className='shadow-box action-divider'></div>
                <Row>
                  <Col className='quiz-option-panel' xs={24} sm={12}>
                    <button className='btn btn-red check-button' onClick={this.quizCountChange.bind(this, 'increase')}>+</button>
                    <span className='quiz-counter card'>{this.state.quizCounter}</span>
                    <button className='btn btn-red check-button' onClick={this.quizCountChange.bind(this, 'minus')}>-</button>
                  </Col>
                  <Col className='quiz-option-panel' xs={24} sm={12}>
                    <button onClick={this.createQuiz.bind(this)} className='btn btn-red min-width-200'>Start</button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}
