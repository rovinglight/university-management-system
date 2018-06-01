import { connect } from 'react-redux'
import CompetitionsApproval from './CompetitionsApproval'
import { deleteApproval } from '../../reducers/Approval'
import { getAllGroups, applyForSgroup } from '../../reducers/Sgroups'
import { upsertCompetition, removeCompetition } from '../../reducers/Competitions'

const mapDispatchToProps = (dispatch) => {
  return {
    getAllGroups: () => dispatch(getAllGroups()),
    applyForSgroup: (userId, groupId) => dispatch(applyForSgroup(userId, groupId)),
    upsertCompetition: (competition) => dispatch(upsertCompetition(competition)),
    removeCompetition: (competitionId) => dispatch(removeCompetition(competitionId)),
    deleteApproval: (approvalIdList) => dispatch(deleteApproval(approvalIdList))
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
  competitions: state.competitions,
  approval: state.approval,
  static: state.static
})

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionsApproval)
