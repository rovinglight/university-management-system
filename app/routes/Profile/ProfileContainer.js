import { connect } from 'react-redux'
import Profile from './Profile'
import { createQuiz, clearList } from '../../reducers/QuizList'
import { register, login } from '../../reducers/UserInfo'

const mapDispatchToProps = (dispatch) => {
  return {
    createQuiz: (count, cb) => dispatch(createQuiz(count, cb)),
    clearList: () => dispatch(clearList()),
    register: (userName, pwd) => dispatch(register(userName, pwd)),
    login: (userName, pwd) => dispatch(login(userName, pwd))
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
