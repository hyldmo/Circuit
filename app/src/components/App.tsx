import * as React from 'react'
import Login from '../containers/Login'
import ServerManager from '../containers/ServerManager'
import {Connection} from '../reducers/connections'

export interface AppProps {
    connections: Connection[]
}

const App = (props: AppProps) => {
    if (props.connections.length > 0) {
        return <ServerManager />
    } else {
        return (
            <div>
                <div id='logo'>
                    <img src='assets/logo.svg'/>
                    <h1>cIRCuit</h1>
                </div>
                <Login/>
            </div>
        )
    }
}

export default App
