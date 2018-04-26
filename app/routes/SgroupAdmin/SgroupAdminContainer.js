import { connect } from 'react-redux'
import SgroupAdmin from './SgroupAdmin'
import { getAllGroups } from '../../reducers/Sgroups'

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user, pwd) => dispatch(login(user, pwd)),
    getAllGroups: () => dispatch(getAllGroups()),
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
  sgroups: state.sgroups
})

export default connect(mapStateToProps, mapDispatchToProps)(SgroupAdmin)
