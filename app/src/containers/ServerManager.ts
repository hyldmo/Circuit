import { connect } from 'react-redux'
import ServerManagerComponent from '../components/ServerManager'
import { showForm, changeServer } from '../actions'

const mapStateToProps = (state) => {
    return {
        connections: state.connections,
        showForm: state.showForm
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            showForm: (show) => {
                dispatch(showForm(show))
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
