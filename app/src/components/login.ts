import * as React from 'react';
import * as r from 'r-dom';
import { Credentials } from "../reducers/credentials";


const Login = (props) => r.div({id: "login"}, [
    r.input({
        type: 'text',
        placeholder: 'Server',
        value: props.server,
        onChange:e => props.actions.updateCredentials('server', e.target.value)
    }),
    r.input({
        type: 'text',
        placeholder: 'Username',
        value: props.username,
        onChange:e => props.actions.updateCredentials('username', e.target.value)
    }),
    //r.input({type: 'password', placeholder: 'password', value: props.password}),
    r.button('Connect')
])

export default Login