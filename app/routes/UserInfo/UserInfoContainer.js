import { connect } from 'react-redux'
import UserInfo from './UserInfo'
import { getAllGroups } from '../../reducers/Sgroups'
import { updateUserInfo } from '../../reducers/UserInfo'

const mapDispatchToProps = (dispatch) => {
  return {
    getAllGroups: () => dispatch(getAllGroups()),
    updateUserInfo: (user) => dispatch(updateUserInfo(user))
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
  competitions: state.competitions,
  static: state.static
})

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
