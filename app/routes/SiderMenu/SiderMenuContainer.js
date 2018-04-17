import { connect } from 'react-redux'
import SiderMenu from './SiderMenu'
import { logOut } from '../../reducers/UserInfo'

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
  routing: state.routing
})

export default connect(mapStateToProps, mapDispatchToProps)(SiderMenu)
