import React, { Component } from 'react'
import classnames from 'classnames'
import { Icon, Row, Col, Menu, Layout, Dropdown, Avatar, message } from 'antd'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import authService from '../../service/authService'
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
  jumpTo (path) {
    this.props.history.push(path)
  }
  menuSelectedConverter () {
    let urlPath = this.props.routing.location.pathname
    const keyConverter = {
      adminGroup: '/studentgroups/admin',
      applyForSgroup: '/studentgroups/new/approval',
      allGroup: '/studentgroups',
      authManage: '/auth/manage',
      approvalManage: '/approval/manage',
      approvalCompetition: '/approval/competitions',
      competitions: '/competitions',
      approvalCompetition: '/competitions/approval',
      applyForCompetition: '/competitions/apply',
      projects: '/projects',
      statistics: '/statistics'
    }
    for (let key in keyConverter) {
      if (_.includes(urlPath, keyConverter[key])) {
        return key
      }
    }
  }
  render () {
    let userAuths = _.get(this.props, 'userInfo.auth')
    let isAuthorized = authService.isAuthorized(userAuths)
    let currentPath = this.menuSelectedConverter()
    let loggedIn = this.props.userInfo.role === 'visitor' ? false : true
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to="/user">个人设置</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/user">待办事项</Link>
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
                selectedKeys={[currentPath]}
              >
                <SubMenu key="sub1" title={<span><Icon type="rocket" />学科竞赛</span>}>
                  <Menu.Item key="competitions"><Link to='/competitions'>全部竞赛</Link></Menu.Item>
                  <Menu.Item key="approvalCompetition"><Link to='/competitions/approval'>竞赛申办</Link></Menu.Item>
                  <Menu.Item key="applyForCompetition">申请参赛</Menu.Item>
                  <Menu.Item key="projects"><Link to='/projects'>项目库</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="solution" />学生组织</span>}>
                  <Menu.Item key="allGroup"><Link to='/studentgroups'>全部社团</Link></Menu.Item>
                  <Menu.Item key="applyForSgroup"><Link to='/studentgroups/new/approval'>新社团申请</Link></Menu.Item>
                  <Menu.Item
                    className={classnames({
                      hide: !isAuthorized()
                    })}
                    key="adminGroup">
                    <Link to='/studentgroups/admin'>社团管理</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  className={classnames({
                    hide: !isAuthorized()
                  })}
                  key="sub3"
                  title={<span><Icon type="tool" />管理员功能</span>}>
                  <Menu.Item key="statistics"><Link to='/statistics'>学生信息统计</Link></Menu.Item>
                  <Menu.Item key="approvalManage"><Link to='/approval/manage'>动态审核设置</Link></Menu.Item>
                  <Menu.Item key="authManage"><Link to='/auth/manage'>权限设置</Link></Menu.Item>
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
              <Col style={{display: 'flex'}}>
                <Link className='header-item font-20' to='/questions'>
                  <Icon type="question-circle-o" />
                </Link>
                <Link to='/login'>
                  <span className={classnames('font-14 header-item', {hide: loggedIn})}>
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
