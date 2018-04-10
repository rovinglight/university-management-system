import React, {Component} from 'react'
import { Route, Link } from 'react-router-dom'
import QuizList from '../QuizList/QuizListContainer'
import Profile from '../Profile/ProfileContainer'
import SiderMenu from '../../components/SiderMenu/SiderMenu.js'

import './App.scss'

export default class App extends Component {
  render () {
    return(
      <div className='app'>
        <SiderMenu/>
        <Route exact path='/test' component={Profile} />
        <Route path='/quizList' component={QuizList} />
      </div>
    )
  }
}
