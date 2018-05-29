import { connect } from 'react-redux'
import QuestionDetail from './QuestionDetail'
import { upsertQuestion, deleteQuestion } from '../../reducers/Question'

const mapDispatchToProps = (dispatch) => {
  return {
    upsertQuestion: (question) => dispatch(upsertQuestion(question)),
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
  competitions: state.competitions,
  approval: state.approval,
  static: state.static,
  question: state.question
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetail)
