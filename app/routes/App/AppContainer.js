import { connect } from 'react-redux'
import App from './App'
import { loginWithSessionKey } from '../../reducers/UserInfo'

const mapDispatchToProps = (dispatch) => {
  return {
    loginWithSessionKey: (sessionKey) => dispatch(loginWithSessionKey(sessionKey)),
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
