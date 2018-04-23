import { connect } from 'react-redux'
import SgroupManage from './SgroupManage'
import { getAllGroups, acceptNewMember, deleteMembers } from '../../reducers/Sgroups'

const mapDispatchToProps = (dispatch) => {
  return {
    getAllGroups: () => dispatch(getAllGroups()),
    acceptNewMember: (userId, groupId) => dispatch(acceptNewMember(userId, groupId)),
    deleteMembers: (userId, groupId) => dispatch(deleteMembers(userId, groupId)),
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
  sgroups: state.sgroups
})

export default connect(mapStateToProps, mapDispatchToProps)(SgroupManage)
