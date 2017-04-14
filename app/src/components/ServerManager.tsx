import * as React from 'react'
import Login from '../containers/Login'
import Chat from './Chat'
import ChatManager from '../containers/ChatManager'
import { Connection, Channel } from '../reducers/connections'
import { parseName } from './ChatTab'
import { ViewMode } from '../reducers/viewMode'

export interface ServerManagerProps {
    connections: Array<Connection>
    viewMode: ViewMode
    actions: {
        changeViewMode: (channel: ViewMode) => void
        changeServer: Function
    }
}

const viewModeComponent = (viewMode: ViewMode) => {
    switch (viewMode) {
        case 'ADD_CHANNEL':
            return null
        case 'ADD_SERVER':
            return <Login />
        case 'DEFAULT':
            return null
    }
}

const ServerManager = (props: ServerManagerProps) => (
    <div className='chats'>
        <div className={`modal ${props.viewMode !== 'DEFAULT' ? 'visible' : 'hidden'}` }>
            <div className='overlay' onClick={e => props.actions.changeViewMode('DEFAULT') }/>
            {viewModeComponent(props.viewMode)}
        </div>
        <ul className='servers'>
            {props.connections.map(conn => (
                <li key={conn.server} onClick={e => props.actions.changeServer(conn.server)}>
                    {parseName(conn.server).slice(0, 2)}
                </li>
            ))}
            <li onClick={e => props.actions.changeViewMode('ADD_SERVER')}>+</li>
        </ul>
        <ChatManager />
    </div>
)
export default ServerManager
