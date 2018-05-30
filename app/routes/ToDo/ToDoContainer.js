import { connect } from 'react-redux'
import ToDo from './ToDo'

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
  competitions: state.competitions,
  static: state.static,
  approval: state.approval,
  question: state.question
})

export default connect(mapStateToProps, mapDispatchToProps)(ToDo)
