import * as React from 'react'
import { connect } from 'react-redux'
import { returntypeof } from 'react-redux-typescript'

import { updateCredentials, connect as connectToServer } from '../actions'
import { State } from '../reducers'
import { Credentials } from '../reducers/credentials'


const mapStateToProps = (state: State): Credentials => ({
    username: state.credentials.username,
    password: state.credentials.password,
    server: state.credentials.server,
    port: state.credentials.port
})

const dispatchToProps =  {
    updateCredentials,
    connect: connectToServer
}

const stateProps = returntypeof(mapStateToProps)
type Props = typeof stateProps & typeof dispatchToProps


const Login: React.StatelessComponent<Props> = (props) => (
    <div className='login'>
        <div>
           <input className='input' type='text' placeholder='Server' value={props.server}
                onChange={e => props.updateCredentials('server', e.currentTarget.value)}
            />
            <input className='input port' type='text' placeholder='Port' value={props.port} maxLength={5}
                onChange={e => props.updateCredentials('port', e.currentTarget.value)}
            />
        </div>
        <div>
            <input className='input' type='text' placeholder='Username' value={props.username}
                onChange={e => props.updateCredentials('username', e.currentTarget.value)}
            />
        </div>
        <div>
            <button className='input input__btn' onClick={e => props.connect(props)}>
                Connect
            </button>
        </div>
    </div>
)

export default connect<typeof stateProps, typeof dispatchToProps, {}>(mapStateToProps, dispatchToProps)(Login)
