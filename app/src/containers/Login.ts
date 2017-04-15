import { connect } from 'react-redux'
import LoginComponent from '../components/Login'
import { updateCredentials, connect as connectToServer } from '../actions'
import { Credentials, ComponentActions } from '../reducers/credentials'
import { State } from '../reducers'

const mapStateToProps = (state: State): Credentials => {
    return {
        username: state.credentials.username,
        password: state.credentials.password,
        server: state.credentials.server,
        port: state.credentials.port
    }
}

const mapDispatchToProps = (dispatch): ComponentActions => {
    return {
        actions: {
            // TODO: Make dispatch require Action interface
            updateCredentials: (field, value) =>  {
                dispatch(updateCredentials(field, value))
            },
            connect: (credentials: Credentials) => {
                dispatch(connectToServer(credentials))
            }
        }
    }
}

const Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginComponent)

export default Login
