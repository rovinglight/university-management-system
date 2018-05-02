import { connect } from 'react-redux'
import App from './App'
import { loginWithSessionKey } from '../../reducers/UserInfo'
import { getAllGroups } from '../../reducers/Sgroups'
import { getAllCompetitions } from '../../reducers/Competitions'

const mapDispatchToProps = (dispatch) => {
  return {
    loginWithSessionKey: (sessionKey) => dispatch(loginWithSessionKey(sessionKey)),
    getAllGroups: () => dispatch(getAllGroups()),
    getAllCompetitions: () => dispatch(getAllCompetitions())
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
