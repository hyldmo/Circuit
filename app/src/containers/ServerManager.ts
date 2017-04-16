import { connect } from 'react-redux'
import ServerManagerComponent from '../components/ServerManager'
import { changeViewMode, changeServer, addTabs } from '../actions'
import { State } from '../reducers'

const mapStateToProps = (state: State) => {
    return {
        connections: state.connections,
        viewMode: state.viewMode
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            changeViewMode: (show) => {
                dispatch(changeViewMode(show))
            },
            changeServer: (name) => {
                dispatch(changeServer(name))
            },
            addChannels: (channels, server) => {
                dispatch(addTabs(channels, server)) // TODO
            }
        }
    }
}

const ServerManager = connect(
    mapStateToProps,
    mapDispatchToProps
)(ServerManagerComponent)

export default ServerManager
