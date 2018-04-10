import { connect } from 'react-redux'
import QuizList from './QuizList'
import { startQuiz, countDown, submitOne, finishQuiz } from '../../reducers/QuizList'

const mapDispatchToProps = (dispatch) => ({
  startQuiz: (cb) => dispatch(startQuiz(cb)),
  countDown: () => dispatch(countDown()),
  submitOne: (question) => dispatch(submitOne(question)),
  finishQuiz: () => dispatch(finishQuiz())
})

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
  quizList: state.quizList
})

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)
