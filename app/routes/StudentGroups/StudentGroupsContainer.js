import { connect } from 'react-redux'
import StudentGroups from './StudentGroups'
import { getAllGroups } from '../../reducers/Sgroups'

const mapDispatchToProps = (dispatch) => {
  return {
    getAllGroups: () => dispatch(getAllGroups()),
  }
}

const mapStateToProps = (state) => ({
  sgroups: state.sgroups,
  userInfo: state.userInfo
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentGroups)
