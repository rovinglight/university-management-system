import { connect } from 'react-redux'
import Approval from './Approval'
import { getAllGroups, applyForSgroup } from '../../reducers/Sgroups'
import { updateApproval } from '../../reducers/Approval'

const mapDispatchToProps = (dispatch) => {
  return {
    getAllGroups: () => dispatch(getAllGroups()),
    applyForSgroup: (userId, groupId) => dispatch(applyForSgroup(userId, groupId)),
    updateApproval: (approval) => dispatch(updateApproval(approval))
  }
}

const mapStateToProps = (state) => ({
  sgroups: state.sgroups,
  userInfo: state.userInfo,
  static: state.static,
  approval: state.approval
})

export default connect(mapStateToProps, mapDispatchToProps)(Approval)
