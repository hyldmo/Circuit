import * as React from 'react'
import { Credentials } from '../reducers/credentials'


const Login = (props: Credentials|any) => (
    <div className='login'>
        <div>
           <input className='input' type='text' placeholder='Server' value={props.server}
                onChange={e => props.actions.updateCredentials('server', e.currentTarget.value)}
            />
            <input className='input port' type='text' placeholder='Port' value={props.port} maxLength={5}
                onChange={e => props.actions.updateCredentials('port', e.currentTarget.value)}
            />
        </div>
        <div>
            <input className='input' type='text' placeholder='Username' value={props.username}
                onChange={e => props.actions.updateCredentials('username', e.currentTarget.value)}
            />
        </div>
        <div>
            <button className='input input__btn' onClick={e => props.actions.connect(props)}>
                Connect
            </button>
        </div>
    </div>
)

export default Login
