import * as React from 'react'
import * as r from 'r-dom'
import Login from '../containers/Login'
import Chat from './Chat'
import ChatTabs from './ChatTabs'
import { Connection } from '../reducers/connections'


const ChatManager = ({ connections, actions }: Array<Connection>|any) => r.div(
    { className: 'chats' },
    [
        ChatTabs(connections.map(c => c.server)),
        connections.map(connection => r(Chat, { ...connection, key: connection.server, actions }))
    ]
)
export default ChatManager
