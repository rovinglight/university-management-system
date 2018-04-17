import React, { Component } from 'react'
import classnames from 'classnames'
import { Icon, Row, Col, Menu, Layout, Dropdown, Avatar, message } from 'antd'
import { Link } from 'react-router-dom'
import _ from 'lodash'
const { SubMenu } = Menu;
const { Sider } = Layout;

import './SiderMenu.scss'
const badge = require('./asset/badge.png')

export default class SiderMenu extends Component {

  constructor (props) {
    super(props)
    let randomNum = _.random(1, 10)
    this.state = {
      sideShow: true,
      randomNum: randomNum
    }
  }
  toggleSide () {
    this.setState({sideShow: !this.state.sideShow})
    this.props.getSideStatus(!this.state.sideShow)
  }
  logout () {
    this.props.logOut().then(() => {
      message.success('已登出')
    })
  }
  // jumpTo () {
  //   this.props.history.push(path)
  // }
  render () {
    let loggedIn = this.props.userInfo.role === 'visitor' ? false : true
    const menu = (
      <Menu>
        <Menu.Item>
          <a href="">个人设置</a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={this.logout.bind(this)}>登出</a>
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
            <Link to='/'>
              <Row className="side-title font-20">
                <Col span={8}>
                  <img className="side-title-img" src={badge} />
                </Col>
                <Col span={16}>
                  集美大学
                </Col>
              </Row>
            </Link>
            <Sider width={256}>
              <Menu
                theme="light"
                mode="inline"
                defaultOpenKeys={['sub1', 'sub2', 'sub3']}
                selectedKeys={['quiz']}
              >
                <SubMenu key="sub1" title={<span><Icon type="user" />学科竞赛</span>}>
                  <Menu.Item key="1">全部竞赛</Menu.Item>
                  <Menu.Item key="2">竞赛申办</Menu.Item>
                  <Menu.Item key="3">项目库</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="solution" />学生组织</span>}>
                  <Menu.Item key="5"><Link to='/studentgroups'>所有社团</Link></Menu.Item>
                  <Menu.Item key="6">新社团申请</Menu.Item>
                  <Menu.Item key="7">社团管理</Menu.Item>
                  <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" title={<span><Icon type="notification" />管理员功能</span>}>
                  <Menu.Item key="9">学生信息统计</Menu.Item>
                  <Menu.Item key="10">动态审核设置</Menu.Item>
                  <Menu.Item key="11">权限设置</Menu.Item>
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
              <Row type="flex"></Row>
              <Col>
                <Link to='login'>
                <span className={classnames('header-item', 'font-14', {hide: loggedIn})}>
                  <Icon className="icon-gap" type="login" />
                  登录/注册
                </span>
              </Link>
                <Dropdown overlay={menu}>
                  <span className={classnames("ant-dropdown-link font-14 header-item", {hide: !loggedIn})} href="#">
                     <Avatar className={`vertical-middle icon-gap bg-gradient-${this.state.randomNum}`} icon="user" />
                     {this.props.userInfo.name}
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
