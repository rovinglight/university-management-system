import { connect } from 'react-redux'
import SgroupApproval from './SgroupApproval'
import { getAllGroups, applyForSgroup } from '../../reducers/Sgroups'
import { upsertCompetition, removeCompetition } from '../../reducers/Competitions'
import { createApproval } from '../../reducers/Approval'

const mapDispatchToProps = (dispatch) => {
  return {
    getAllGroups: () => dispatch(getAllGroups()),
    applyForSgroup: (userId, groupId) => dispatch(applyForSgroup(userId, groupId)),
    createApproval: (schema, name) => dispatch(createApproval(schema, name))
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
  competitions: state.competitions,
  approval: state.approval,
  static: state.static
})

export default connect(mapStateToProps, mapDispatchToProps)(SgroupApproval)
