import React, {Component} from 'react'
import { Route, Link } from 'react-router-dom'
import { message } from 'antd'
import SiderMenu from '../SiderMenu/SiderMenuContainer'
import Login from '../Login/LoginContainer'
import StudentGroups from '../StudentGroups/StudentGroupsContainer'
import SgroupManage from '../SgroupManage/SgroupManageContainer'
import SgroupAdmin from '../SgroupAdmin/SgroupAdminContainer'
import AuthManage from '../AuthManage/AuthManageContainer'
import Approval from '../Approval/ApprovalContainer'
import ApprovalManage from '../ApprovalManage/ApprovalManageContainer'
import Competitions from '../Competitions/CompetitionsContainer'
import CompetitionsApproval from '../CompetitionsApproval/CompetitionsApprovalContainer'
import classnames from 'classnames'

import './App.scss'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sideShow : true
    }
    props.getAllGroups()
    props.getAllCompetitions()
    props.getAllStatic()
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
          <Route exact path={`/studentgroups/admin`} component={SgroupAdmin} />
          <Route exact path={`/studentgroups/manage/:groupId`} component={SgroupManage} />
          <Route exact path={`/auth/manage`} component={AuthManage} />
          <Route exact path={`/competitions`} component={Competitions} />
          <Route exact path={`/competitions/approval`} component={CompetitionsApproval} />
          <Route exact path={`/approval/manage`} component={ApprovalManage} />
          <Route exact path={`/approval/:schemaId/:approvalId`} component={Approval} />
        </div>
      </div>
    )
  }
}
