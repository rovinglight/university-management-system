import React, { Component } from 'react'
import { Row, Col, Button, Form, Input, Icon, Checkbox, Tabs } from 'antd'
const FormItem = Form.Item
const TabPane = Tabs.TabPane;

import './Login.scss'
const badge = require('../../components/SiderMenu/asset/badge.png')

export default class Login extends Component {
  render () {
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
                    <Tabs tabBarStyle={{"borderBottom": "none", "textAlign": "center", "marginBottom": "30px"}} defaultActiveKey="1">
                      <TabPane tab="学生登录" key="1">
                        <Form className="login-form">
                          <FormItem>
                            <Input
                              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                              size="large"
                              placeholder="用户名" />
                          </FormItem>
                          <FormItem>
                            <Input
                              prefix={<Icon type="lock"
                              style={{ color: 'rgba(0,0,0,.25)' }} />}
                              size="large"
                              type="password"
                              placeholder="密码" />
                          </FormItem>
                          <FormItem>
                            <Checkbox>自动登录</Checkbox>
                            <a className="float-right" href="">忘记密码？</a>
                          </FormItem>
                          <FormItem>
                            <Button type="primary" size="large" className="login-form-submit">
                              登录
                            </Button>
                          </FormItem>
                        </Form>
                      </TabPane>
                      <TabPane tab="教师登录" key="2">
                        <Form className="login-form">
                          <FormItem>
                            <Input
                              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                              size="large"
                              placeholder="用户名" />
                          </FormItem>
                          <FormItem>
                            <Input
                              prefix={<Icon type="lock"
                              style={{ color: 'rgba(0,0,0,.25)' }} />}
                              size="large"
                              type="password"
                              placeholder="密码" />
                          </FormItem>
                          <FormItem>
                            <Checkbox>自动登录</Checkbox>
                            <a className="float-right" href="">忘记密码？</a>
                          </FormItem>
                          <FormItem>
                            <Button type="primary" size="large" className="login-form-submit">
                              登录
                            </Button>
                          </FormItem>
                        </Form>
                      </TabPane>
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
