import { connect } from 'react-redux'
import QuestionDetail from './QuestionDetail'

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
  competitions: state.competitions,
  approval: state.approval,
  static: state.static
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetail)
