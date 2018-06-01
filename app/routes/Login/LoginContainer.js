import { connect } from 'react-redux'
import Login from './Login'
import { login } from '../../reducers/UserInfo'

const mapDispatchToProps = (dispatch) => { //容器是把数据和会造成Store中数据变化的方法注入到组件中
  return {
    login: (user, pwd) => dispatch(login(user, pwd)),
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
