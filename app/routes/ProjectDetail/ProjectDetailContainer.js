import { connect } from 'react-redux'
import ProjectDetail from './ProjectDetail'
import { upsertProject } from '../../reducers/Project'

const mapDispatchToProps = (dispatch) => {
  return {
    upsertProject: (project) => dispatch(upsertProject(project))
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
  competitions: state.competitions,
  static: state.static,
  project: state.project
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail)
