import React, { Component } from 'react'
import classnames from 'classnames'
import { Icon, Row, Col, Menu, Layout, Dropdown, Avatar } from 'antd'
const { SubMenu } = Menu;
const { Sider } = Layout;

import './SiderMenu.scss'
const badge = require('./asset/badge.jpg')

export default class SiderMenu extends Component {

  constructor (props) {
    super(props)
    this.state = {
      sideShow: true
    }
  }
  toggleSide () {
    console.log('toggle')
    this.setState({sideShow: !this.state.sideShow})
  }
  render () {
    const menu = (
      <Menu>
        <Menu.Item>
          <a href="">个人设置</a>
        </Menu.Item>
        <Menu.Item>
          <a href="">登出</a>
        </Menu.Item>
      </Menu>
    )
    return (
      <div className={classnames(
        "sider-menu"
      )}>
        <div className={classnames(
          {'side-show': this.state.sideShow}
        )}>
          <div className="side-bar">
            <Row className="side-title font-20">
              <Col span={8}>
                <img className="side-title-img" src={badge} />
              </Col>
              <Col span={16}>
                集美大学
              </Col>
            </Row>
            <Sider width={256}>
              <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                selectedKeys={['2']}
              >
                <SubMenu key="sub1" title={<span><Icon type="user" />学科竞赛</span>}>
                  <Menu.Item key="1">全部竞赛</Menu.Item>
                  <Menu.Item key="2">竞赛申办</Menu.Item>
                  <Menu.Item key="3">项目库</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                  <Menu.Item key="5">option5</Menu.Item>
                  <Menu.Item key="6">option6</Menu.Item>
                  <Menu.Item key="7">option7</Menu.Item>
                  <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                  <Menu.Item key="9">option9</Menu.Item>
                  <Menu.Item key="10">option10</Menu.Item>
                  <Menu.Item key="11">option11</Menu.Item>
                  <Menu.Item key="12">option12</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
          </div>
          <div className="mask" onClick={this.toggleSide.bind(this)}></div>
          <div className="header">
            <Row type="flex" justify="space-between">
              <Col span={4} onClick={this.toggleSide.bind(this)}>
                <Icon className="side-trigger font-20" type={!this.state.sideShow ? "menu-unfold" : "menu-fold"} />
              </Col>
              <Row flex></Row>
              <Col>
                <span className={classnames('header-item', 'font-14')}>
                  <Icon className="icon-gap" type="login" />
                  登录/注册
                </span>
                <Dropdown className={classnames('')} overlay={menu}>
                  <span className="ant-dropdown-link font-14 header-item" href="#">
                     <Avatar className="vertical-middle icon-gap" icon="user" />
                     用户名
                     <Icon type="down" />
                  </span>
                </Dropdown>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}
