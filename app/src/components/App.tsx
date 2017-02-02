import * as React from 'react'
import Login from '../containers/Login'
import ChatManager from '../containers/ChatManager'
import {Connection} from '../reducers/connections'

export interface AppProps {
    connections: Array<Connection>
}

const App = (props: AppProps) => {
    if (props.connections.length > 0) {
        return <ChatManager/>
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
