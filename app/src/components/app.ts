import * as React from 'react'
import * as r from 'r-dom'
import Login from '../containers/Login'
import ChatManager from '../containers/ChatManager'
import {Connection} from '../reducers/connections'

export interface AppProps {
    compiler: string
    framework: string
    connections: Array<Connection>
}

const AppComponent = (props: AppProps) => r.div(
    props.connections.length > 0 ?
        [r(ChatManager)] :
        [
            r.div({id: 'logo'}, [
                r.img({src: 'assets/logo.svg'}),
                r.h1('cIRCuit')
            ]),
            r.h1(`Hello from ${props.compiler} and ${props.framework}!`),
            r(Login)
        ]
)

export default AppComponent
