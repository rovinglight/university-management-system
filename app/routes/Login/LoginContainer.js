import { connect } from 'react-redux'
import Login from './Login'

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
