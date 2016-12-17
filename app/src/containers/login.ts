import { connect } from 'react-redux'
import LoginComponent from '../components/Login'
import { updateCredentials } from '../actions'
import { Credentials, ComponentActions } from "../reducers/credentials";

const mapStateToProps = (state): Credentials => {
    return {
        username: state.credentials.username,
        password: state.credentials.password,
        server: state.credentials.server,
        port: state.credentials.port
    }
};

const mapDispatchToProps = (dispatch): ComponentActions => {
    return {
        actions: {
            updateCredentials: (field, value) =>  {
                dispatch(updateCredentials(field, value))
            }
        }
    }
};

const Login = connect<{}, {}, Credentials>(
    mapStateToProps,
    mapDispatchToProps
)(LoginComponent);

export default Login