import { connect } from 'react-redux'
import ApprovalManage from './ApprovalManage'
import { getAllGroups, applyForSgroup } from '../../reducers/Sgroups'
import { updateApprovalSchema } from '../../reducers/Static'

const mapDispatchToProps = (dispatch) => {
  return {
    getAllGroups: () => dispatch(getAllGroups()),
    applyForSgroup: (userId, groupId) => dispatch(applyForSgroup(userId, groupId)),
    updateApprovalSchema: (newSchema, updatedSchemaId) => dispatch(updateApprovalSchema(newSchema, updatedSchemaId))
  }
}

const mapStateToProps = (state) => ({
  sgroups: state.sgroups,
  userInfo: state.userInfo,
  static: state.static
})

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalManage)
