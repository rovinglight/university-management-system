import { connect } from 'react-redux'
import Statistics from './Statistics'

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
  competitions: state.competitions,
  approval: state.approval,
  static: state.static,
  sgroups: state.sgroups
})

export default connect(mapStateToProps, mapDispatchToProps)(Statistics)
