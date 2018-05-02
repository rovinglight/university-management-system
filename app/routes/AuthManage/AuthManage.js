import React, { Component } from 'react'
import { Row, Col, Button, message, List, Avatar, Input, Tag, Icon, Modal, Divider, Select } from 'antd'
import _ from 'lodash'
import classnames from 'classnames'
import authService from '../../service/authService'
const Search = Input.Search
const Option = Select.Option

import './AuthManage.scss'

const allAuths = [{
  role: 'administrator',
  display: '管理员'
}, {
  role: 'studentGroupPresident',
  display: '学生组织主席'
}, {
  role: 'studentGroupMember',
  display: '学生组织成员'
}, {
  role: 'studentGroupApplicant',
  display: '学生组织申请者'
}]

export default class AuthManage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchButtonLoading: false,
      searchResults: [],
      authModal: {
        show: false,
        authInfo: {},
        loading: false,
        readOnly: true
      }
    }
  }
  componentDidUpdate () {
    let userAuths = _.get(this.props, 'userInfo.auth')
    authService.redirectIfNotAuth.bind(this, userAuths, [])()
  }
  searchForUser (value) {
    this.setState({searchButtonLoading: true, searchResults: []})
    authService.searchUser(value).then((result) => {
      message.success('搜索完成')
      this.setState({searchButtonLoading: false, searchResults: result})
    }).catch((e) => {
      message.error('未找到用户')
      this.setState({searchButtonLoading: false})
    })
  }
  viewAuth (auth) {
    let authModal = _.cloneDeep(this.state.authModal)
    authModal = {
      ...authModal,
      show: true,
      readOnly: true,
      authInfo: auth
    }
    this.setState({authModal: authModal})
  }
  addNewAuth (user) {
    let authModal = _.cloneDeep(this.state.authModal)
    authModal = {
      ...authModal,
      show: true,
      readOnly: false,
      authInfo: {},
      userToAdd: user
    }
    this.setState({authModal: authModal})
  }
  handleChange (path, result) {
    if (_.get(result, 'target')) {
      result = result.target.value
    }
    let newState = _.cloneDeep(this.state)
    _.set(newState, path, result)
    this.setState(newState)
  }
  submitAuthModal () {
    let authModal = this.state.authModal
    let userId = authModal.userToAdd._id
    let auth = _.cloneDeep(authModal.userToAdd.auth)
    if (_.find(auth, authModal.authInfo)) {
      return message.warning('权限已存在')
    }
    auth.push(authModal.authInfo)
    authService.updateUserAuthById(userId, auth).then((user) => {
      let newState = _.cloneDeep(this.state)
      let changedUser = _.find(newState.searchResults, {_id: user._id})
      _.assign(changedUser, user)
      newState.authModal.show = false
      this.setState(newState)
      message.success('添加权限成功')
    }).catch((e) => {
      this.handleChange('authModal.loading', false)
      message.error('添加权限失败')
    })
  }
  closeAuthModal () {
    let newState = _.cloneDeep(this.state)
    newState.authModal = {
      show: false,
      authInfo: {},
      loading: false,
      readOnly: true
    }
    this.setState(newState)
  }
  removeAuth (user, index, e) {
    e.stopPropagation()
    e.preventDefault()
    let auth = _.cloneDeep(user.auth)
    auth.splice(index, 1)
    authService.updateUserAuthById(user._id, auth).then((user) => {
      let newState = _.cloneDeep(this.state)
      let changedUser = _.find(newState.searchResults, {_id: user._id})
      _.assign(changedUser, user)
      this.setState(newState)
      message.success('删除权限成功')
    }).catch((e) => {
      message.error('删除权限失败')
    })
  }
  render () {
    let authModal = this.state.authModal
    let sgroups = this.props.sgroups.groups
    return (
      <div className="auth-manage">
        <Row className="page-title">
          <Col>
            <h1>权限管理</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="shadow-box bg-white padding-20 margin-bottom-25">
              <h2>用户权限设置</h2>
              <Search
                autoFocus
                placeholder="用户搜索"
                onSearch={this.searchForUser.bind(this)}
                enterButton={<Icon type={this.state.searchButtonLoading ? "loading" : "search"} />}
              />
              <List
                itemLayout="horizontal"
                size="large"
                dataSource={this.state.searchResults}
                renderItem={item => (
                  <List.Item
                    style={{'textAlign': 'left'}}
                    key={item.title}
                    actions={[]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar className={`vertical-middle icon-gap bg-gradient-${_.random(1, 10)}`} icon="user" />}
                      title={item.name}
                      description={item.user}
                    />
                    <Row type='flex'>
                      {item.auth.map((auth, index) => {
                        return (
                          <Col key={index}>
                            <Tag
                              color='blue'
                              closable
                              onClick={this.viewAuth.bind(this, auth)}
                              onClose={this.removeAuth.bind(this, item, index)}>
                              {_.get(_.find(allAuths, {role: auth.role}), 'display') || auth.role}
                            </Tag>
                          </Col>
                        )
                      })}
                      <Col>
                        <Tag onClick={this.addNewAuth.bind(this, item)}>
                          <Icon type='plus' />
                        </Tag>
                      </Col>
                    </Row>
                  </List.Item>
                )}
              />
            </div>
          </Col>
        </Row>
        <Modal
          visible={authModal.show}
          title='权限详情'
          onCancel={this.closeAuthModal.bind(this)}
          footer={[
            <Button key="back" onClick={this.closeAuthModal.bind(this)}>放弃修改</Button>,
            <Button key="submit" onClick={this.submitAuthModal.bind(this)} type="primary" loading={authModal.loading}>
              提交修改
            </Button>,
          ]}>
          <Divider orientation="left">权限身份</Divider>
            <Select
              onChange={this.handleChange.bind(this, 'authModal.authInfo.role')}
              value={authModal.authInfo.role}
              style={{ minWidth: 120 }}
              disabled={authModal.readOnly}>
              {allAuths.map((auth, index) => {
                return(
                  <Option key={index} value={auth.role}>{auth.display}</Option>
                )
              })}
            </Select>
          <Divider orientation="left">其他信息</Divider>
            <Select
              className={classnames({
                hide: !(_.includes(['studentGroupPresident', 'studentGroupMember', 'studentGroupApplicant'], authModal.authInfo.role))
              })}
              onChange={this.handleChange.bind(this, 'authModal.authInfo.groupId')}
              style={{ minWidth: 120 }}
              disabled={authModal.readOnly}
              value={authModal.authInfo.groupId} >
              {sgroups.map((sgroup, index) => {
                return(
                  <Option key={index} value={sgroup._id}>{sgroup.name}</Option>
                )
              })}
            </Select>
        </Modal>
      </div>
    )
  }
}
