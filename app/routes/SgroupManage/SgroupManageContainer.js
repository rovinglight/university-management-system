import { connect } from 'react-redux'
import SgroupManage from './SgroupManage'
import { getAllGroups } from '../../reducers/Sgroups'

const mapDispatchToProps = (dispatch) => {
  return {
    getAllGroups: () => dispatch(getAllGroups()),
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
  sgroups: state.sgroups
})

export default connect(mapStateToProps, mapDispatchToProps)(SgroupManage)
