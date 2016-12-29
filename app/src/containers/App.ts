import { connect } from 'react-redux'
import AppComponent from '../components/App'
import {AppProps} from '../components/App'

const mapStateToProps = (state): AppProps => {
    return {
        connections: state.connections
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppComponent)

export default App
