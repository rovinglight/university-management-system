import { connect } from 'react-redux'
import Approval from './Approval'
import { getAllGroups, applyForSgroup } from '../../reducers/Sgroups'

const mapDispatchToProps = (dispatch) => {
  return {
    getAllGroups: () => dispatch(getAllGroups()),
    applyForSgroup: (userId, groupId) => dispatch(applyForSgroup(userId, groupId))
  }
}

const mapStateToProps = (state) => ({
  sgroups: state.sgroups,
  userInfo: state.userInfo
})

export default connect(mapStateToProps, mapDispatchToProps)(Approval)
