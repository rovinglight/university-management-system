import { connect } from 'react-redux'
import App from './App'
import { loginWithSessionKey } from '../../reducers/UserInfo'
import { getAllGroups } from '../../reducers/Sgroups'
import { getAllCompetitions } from '../../reducers/Competitions'
import { getAllStatic } from '../../reducers/Static'
import { getAllApproval } from '../../reducers/Approval'

const mapDispatchToProps = (dispatch) => {
  return {
    loginWithSessionKey: (sessionKey) => dispatch(loginWithSessionKey(sessionKey)),
    getAllGroups: () => dispatch(getAllGroups()),
    getAllCompetitions: () => dispatch(getAllCompetitions()),
    getAllStatic: () => dispatch(getAllStatic()),
    getAllApproval: () => dispatch(getAllApproval())
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
