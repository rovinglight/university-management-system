import { connect } from 'react-redux'
import App from './App'

const mapDispatchToProps = {}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
