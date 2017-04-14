import { connect } from 'react-redux'
import ServerManagerComponent from '../components/ServerManager'
import { changeViewMode, changeServer } from '../actions'

const mapStateToProps = (state) => {
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
            }
        }
    }
}

const ServerManager = connect(
    mapStateToProps,
    mapDispatchToProps
)(ServerManagerComponent)

export default ServerManager
