import { connect } from 'react-redux'
import SgroupAdmin from './SgroupAdmin'

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user, pwd) => dispatch(login(user, pwd)),
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo
})

export default connect(mapStateToProps, mapDispatchToProps)(SgroupAdmin)
