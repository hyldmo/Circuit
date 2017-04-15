import * as React from 'react'
import Login from '../containers/Login'
import AddChannel from './AddChannel'
import Chat from './Chat'
import ChatManager from '../containers/ChatManager'
import { Connection } from '../reducers/connections'
import { parseName } from './ChatTab'
import { ViewMode } from '../reducers/viewMode'

export interface ServerManagerProps {
    connections: Connection[]
    viewMode: ViewMode
    actions: {
        changeViewMode(viewMode: ViewMode)
        addChannels(channels: string[])
        changeServer(name: string)
    }
}

const viewModeComponent = (props: ServerManagerProps) => {
    switch (props.viewMode) {
        case 'ADD_CHANNEL':
            return <AddChannel onSubmit={cs => props.actions.addChannels(cs)} />
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
            {viewModeComponent(props)}
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
