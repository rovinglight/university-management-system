import React, {Component} from 'react'
import { Route, Link } from 'react-router-dom'
import { message } from 'antd'
import SiderMenu from '../SiderMenu/SiderMenuContainer'
import Login from '../Login/LoginContainer'
import StudentGroups from '../StudentGroups/StudentGroupsContainer'
import SgroupManage from '../SgroupManage/SgroupManageContainer'
import classnames from 'classnames'

import './App.scss'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sideShow : true
    }
  }
  componentDidMount () {
    let sessionKey = localStorage.getItem('sessionKey')
    if (sessionKey) {
      this.props.loginWithSessionKey(sessionKey).then((user) => {
        message.success(`${user.name}登录成功`)
      }).catch((e) => {
        localStorage.removeItem('sessionKey')
      })
    }
  }
  getSideStatus (status) {
    this.setState({sideShow: status})
  }
  render () {
    return(
      <div className='app'>
        <SiderMenu getSideStatus={this.getSideStatus.bind(this)} />
        <div className={classnames("main-container", {side: this.state.sideShow})}>
          <Route path='/login' component={Login}/>
          <Route exact path='/studentgroups' component={StudentGroups}/>
          <Route path={`/studentgroups/:groupId`} component={SgroupManage} />
        </div>
      </div>
    )
  }
}
