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
import classnames from 'classnames'

import './App.scss'

// 路由器组件无法接受两个及以上的子元素。基于这种限制的存在，创建一个<App>组件来渲染应用其余部分是一个有效的方法
// （对于服务端渲染，将应用从router组件中分离也是重要的）。
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
  }
  componentDidMount () {
    //在第一次渲染后调用，只在客户端。
    let sessionKey = localStorage.getItem('sessionKey') //获取sessionKey本地存储的值，
    //localStorage用于持久化的本地存储，除非主动删除数据，否则数据是永远不会过期的。
    if (sessionKey) {
      this.props.loginWithSessionKey(sessionKey).then((user) => {
        message.success(`${user.name}登录成功`)
      }).catch((e) => {
        localStorage.removeItem('sessionKey') //删除sessionKey本地存储的值
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
        {/*状态的传递和改变不懂，classnames也没有查到资料*/}
          <Route path='/login' component={Login}/>
          <Route exact path='/studentgroups' component={StudentGroups}/>
          <Route exact path={`/studentgroups/admin`} component={SgroupAdmin} />
          <Route exact path={`/studentgroups/manage/:groupId`} component={SgroupManage} />
          <Route exact path={`/studentgroups/new/approval`} component={SgroupApproval} />
          <Route exact path={`/auth/manage`} component={AuthManage} />
          <Route exact path={`/competitions`} component={Competitions} />
          <Route exact path={`/competitions/approval`} component={CompetitionsApproval} />
          <Route exact path={`/approval/manage`} component={ApprovalManage} />
          <Route exact path={`/approval/:schemaId/:approvalId`} component={Approval} />
          {/* 当一个路由的path匹配成功后，路由用来确定渲染结果的参数有三种。只需要提供其中一个即可。
          component ：一个React组件。当带有component参数的route匹配成功后，route会返回一个新的元素，
          其为component参数所对应的React组件（使用React.createElement创建）。 */}
          <Route exact path={`/approval/detail/:approvalId`} component={Approval} />
          <Route exact path={`/user`} component={UserInfo} />
        </div>
      </div>
    )
  }
}
