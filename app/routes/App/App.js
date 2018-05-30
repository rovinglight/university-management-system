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
import SgroupApproval from '../SgroupApproval/SgroupApprovalContainer'
import UserInfo from '../UserInfo/UserInfoContainer'
import Projects from '../Projects/ProjectsContainer'
import Questions from '../Questions/QuestionsContainer'
import QuestionDetail from '../QuestionDetail/QuestionDetailContainer'
import Statistics from '../Statistics/StatisticsContainer'
import ToDo from '../ToDo/ToDoContainer'
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
    props.getAllApproval()
    props.getAllQuestions()
    props.getAllProjecs()
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
          <Route exact path={`/studentgroups/new/approval`} component={SgroupApproval} />
          <Route exact path={`/auth/manage`} component={AuthManage} />
          <Route exact path={`/competitions`} component={Competitions} />
          <Route exact path={`/competitions/approval`} component={CompetitionsApproval} />
          <Route exact path={`/approval/manage`} component={ApprovalManage} />
          <Route exact path={`/approval/detail/:approvalId`} component={Approval} />
          <Route exact path={`/user`} component={UserInfo} />
          <Route exact path={`/projects`} component={Projects} />
          <Route exact path={`/questions`} component={Questions} />
          <Route exact path={`/questions/detail/:questionId`} component={QuestionDetail} />
          <Route exact path={`/statistics`} component={Statistics} />
          <Route exact path={`/`} component={ToDo} />
        </div>
      </div>
    )
  }
}
