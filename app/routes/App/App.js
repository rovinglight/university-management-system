import React, {Component} from 'react'
import { Route, Link } from 'react-router-dom'
import { message } from 'antd'
import QuizList from '../QuizList/QuizListContainer'
import Profile from '../Profile/ProfileContainer'
import SiderMenu from '../../components/SiderMenu/SiderMenu.js'
import Login from '../Login/LoginContainer'
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
          <Route exact path='/test' component={Profile} />
          <Route path='/quizList' component={QuizList} />
        </div>
      </div>
    )
  }
}
