import { connect } from 'react-redux'
import Questions from './Questions'
import { upsertQuestion, deleteQuestion } from '../../reducers/Question'

const mapDispatchToProps = (dispatch) => {
  return {
    upsertQuestion: (question) => dispatch(upsertQuestion(question)),
    deleteQuestion: (questionId) => dispatch(deleteQuestion(questionId))
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
  competitions: state.competitions,
  approval: state.approval,
  static: state.static,
  question: state.question
})

export default connect(mapStateToProps, mapDispatchToProps)(Questions)
