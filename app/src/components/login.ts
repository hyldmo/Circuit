import * as React from 'react';
import * as r from 'r-dom';

export interface Props {
    username: string;
    password: string;
}

const Login = (props: Props) => r.div({id: "login"}, [
    r.input({type: 'text', placeholder: 'username', value: props.username}),
    r.input({type: 'password', placeholder: 'password', value: props.password}),
])

export default Login