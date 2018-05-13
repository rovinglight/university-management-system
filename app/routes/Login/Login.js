import React, { Component } from 'react'
import { Row, Col, Button, Form, Input, Icon, Checkbox, Tabs, message } from 'antd'
import _ from 'lodash'
const FormItem = Form.Item
const TabPane = Tabs.TabPane;

import './Login.scss'
const badge = require('../SiderMenu/asset/badge.png')//引入目标模块（集美大学校徽图片）


export default class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      form: {
        user: '',
        pwd: ''
      },
      validation: {
        user: false,
        pwd: false
      },
      loginBtnLoading: false
    }
  }
  componentDidUpdate () {
    //componentDidUpdate 在组件完成更新后立即调用。在初始化时不会被调用。
    if (this.props.userInfo.sessionKey) {
        this.props.history.push('/')
        //push(path, [state]) 在历史堆栈信息里加入一个新条目。
        // history是RR4的两大重要依赖之一，另一个是React。
    }
  }
  handleChange (path, e) {
    _.set(this.state, path, e.target.value)
    // _.set(object, path, value)
    // 设置 object对象中对应 path 属性路径上的值，如果path不存在，则创建。 
    // 缺少的索引属性会创建为数组，而缺少的属性会创建为对象。 使用 _.setWith 定制path创建。 
    this.setState(this.state)
  }
  validation () {//不懂这个key的作用是什么
    let flag = true
    let validation = {}
    let form = this.state.form
    for (let key in form) {
      if (!form[key]) {
        flag = false
        validation[key] = true
      } else {
        validation[key] = false
      }
    }
    this.setState({validation: validation})
    return flag
  }
  login () {
    let form = this.state.form
    if (!this.validation()) {
      return
    }
    this.setState({loginBtnLoading:true})
    this.props.login(form.user, form.pwd).then((res) => {
      message.success('登录成功')
    }).catch((err) => {
      message.error('登录失败')
      this.setState({loginBtnLoading:false})
    })
  }
  render () {
    let validation = this.state.validation
    return (
      <div className="Login">
        <Row className="login-container" type="flex" justify="center" align="middle">
          <Col lg={8} md={10} span={22}>
            <div className="card login-card">
              <div className="login-card-title">
                <Row className="height-100" type="flex" justify="center" align="middle">
                  <img className="shadow-box" src={badge} />
                  <p className="font-20">集美大学团委管理平台</p>
                </Row>
              </div>
              <div className="login-card-content">
                <Row type="flex" justify="center" align="middle">
                  <Col>
                    <Tabs tabBarStyle={{"borderBottom": "none", "textAlign": "center", "marginBottom": "30px"}} activeKey="1">
                      <TabPane tab="" key="3"></TabPane>
                      <TabPane tab="用户登录" key="1">
                        <Form className="login-form">
                          <FormItem
                            help={validation.user ? "账号不可为空" : ""}
                            validateStatus={validation.user ? "error" : ""}>
                            {/* 校验状态，如不设置，则会根据校验规则自动生成，可选：'success' 'warning' 'error' 'validating' */}
                            <Input
                              autoFocus
                              value={this.state.form.user}
                              onChange={this.handleChange.bind(this, 'form.user')}
                              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                              size="large"
                              placeholder="学号" />
                          </FormItem>
                          <FormItem
                            help={validation.pwd ? "密码不可为空" : ""}
                            validateStatus={validation.pwd ? "error" : ""}>
                            <Input
                              value={this.state.form.pwd}
                              onChange={this.handleChange.bind(this, 'form.pwd')}
                              onPressEnter={this.login.bind(this)}
                              prefix={<Icon type="lock"
                              style={{ color: 'rgba(0,0,0,.25)' }} />}
                              size="large"
                              type="password"
                              placeholder="密码" />
                          </FormItem>
                          <FormItem>
                            <Checkbox>记住我</Checkbox>
                            <a className="float-right" href="">忘记密码？</a>
                          </FormItem>
                          <FormItem>
                            <Button
                              loading={this.state.loginBtnLoading}
                              onClick={this.login.bind(this)}
                              type="primary"
                              size="large"
                              className="login-form-submit">
                              登录
                            </Button>
                          </FormItem>
                        </Form>
                      </TabPane>
                      <TabPane tab="" key="2"></TabPane>
                    </Tabs>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
