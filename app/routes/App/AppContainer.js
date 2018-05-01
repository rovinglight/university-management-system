import { connect } from 'react-redux'
import App from './App'
import { loginWithSessionKey } from '../../reducers/UserInfo'
import { getAllGroups } from '../../reducers/Sgroups'

const mapDispatchToProps = (dispatch) => {
  return {
    loginWithSessionKey: (sessionKey) => dispatch(loginWithSessionKey(sessionKey)),
    getAllGroups: () => dispatch(getAllGroups())
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
