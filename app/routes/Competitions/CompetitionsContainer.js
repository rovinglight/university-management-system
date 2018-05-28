import { connect } from 'react-redux'
import Competitions from './Competitions'
import { getAllGroups, applyForSgroup } from '../../reducers/Sgroups'
import { upsertCompetition, removeCompetition } from '../../reducers/Competitions'
import { createApproval } from '../../reducers/Approval'

const mapDispatchToProps = (dispatch) => {
  return {
    getAllGroups: () => dispatch(getAllGroups()),
    applyForSgroup: (userId, groupId) => dispatch(applyForSgroup(userId, groupId)),
    upsertCompetition: (competition) => dispatch(upsertCompetition(competition)),
    removeCompetition: (competitionId) => dispatch(removeCompetition(competitionId)),
    createApproval: (schema, name) => dispatch(createApproval(schema, name))
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
  competitions: state.competitions,
  static: state.static
})

export default connect(mapStateToProps, mapDispatchToProps)(Competitions)
