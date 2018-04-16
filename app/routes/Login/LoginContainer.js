import { connect } from 'react-redux'
import Login from './Login'
import { login } from '../../reducers/UserInfo'

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user, pwd) => dispatch(login(user, pwd)),
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
