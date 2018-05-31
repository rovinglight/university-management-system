import { connect } from 'react-redux'
import App from './App'
import { loginWithSessionKey } from '../../reducers/UserInfo'
import { getAllGroups } from '../../reducers/Sgroups'
import { getAllCompetitions } from '../../reducers/Competitions'
import { getAllStatic } from '../../reducers/Static'
import { getAllApproval } from '../../reducers/Approval'
import { getAllQuestions } from '../../reducers/Question'
import { getAllProjecs } from '../../reducers/Project'

const mapDispatchToProps = (dispatch) => {
  return {
    loginWithSessionKey: (sessionKey) => dispatch(loginWithSessionKey(sessionKey)),
    getAllGroups: () => dispatch(getAllGroups()),
    getAllCompetitions: () => dispatch(getAllCompetitions()),
    getAllStatic: () => dispatch(getAllStatic()),
    getAllApproval: () => dispatch(getAllApproval()),
    getAllQuestions: () => dispatch(getAllQuestions()),
    getAllProjecs: () => dispatch(getAllProjecs())
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
  static: state.static,
  routing: state.routing
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
