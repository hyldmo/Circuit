import { connect } from 'react-redux'
import AppComponent, { AppProps } from '../components/App'
import { Connection } from '../reducers/connections'
import { State } from '../reducers'

const mapStateToProps = (state: State): AppProps => {
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
