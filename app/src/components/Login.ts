import * as React from 'react'
import * as r from 'r-dom'
import { Credentials } from '../reducers/credentials'


const Login = (props: Credentials|any) => r.div({className: 'login'}, [
    r.input({
        className: 'input',
        type: 'text',
        placeholder: 'Server',
        value: props.server,
        onChange: e => props.actions.updateCredentials('server', e.target.value)
    }),
    r.input({
        className: 'input',
        type: 'text',
        placeholder: 'Username',
        value: props.username,
        onChange: e => props.actions.updateCredentials('username', e.target.value)
    }),
    // r.input({type: 'password', placeholder: 'password', value: props.password}),
    r.button({
        className: 'input input__btn',
        onClick: e => props.actions.connect(props)
    }, 'Connect')
])

export default Login
