import { connect } from 'react-redux'
import Projects from './Projects'

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
  competitions: state.competitions,
  static: state.static
})

export default connect(mapStateToProps, mapDispatchToProps)(Projects)
