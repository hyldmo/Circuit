import * as React from 'react'
import Login from '../containers/Login'
import Chat from './Chat'
import ChatManager from '../containers/ChatManager'
import { Connection, Channel } from '../reducers/connections'
import { parseName } from './ChatTab'

export interface ServerManagerProps {
    connections: Array<Connection>
    showForm: boolean
    actions: {
        showForm: Function
        changeServer: Function
    }
}

const ServerManager = (props: ServerManagerProps) => (
    <div className='chats'>
        <div className={`modal ${props.showForm ? 'visible' : 'hidden'}` }>
            <div className='overlay' onClick={e => props.actions.showForm(false) }/>
            <Login/>
        </div>
        <ul className='servers'>
            {props.connections.map(conn => (
                <li key={conn.server} onClick={e => props.actions.changeServer(conn.server)}>
                    {parseName(conn.server).slice(0, 2)}
                </li>
            ))}
            <li onClick={e => props.actions.showForm(true)}>+</li>
        </ul>
        <ChatManager />
    </div>
)
export default ServerManager
