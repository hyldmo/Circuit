import * as React from 'react'
import * as r from 'r-dom'
import Login from '../containers/Login'
import Chat from './Chat'
import ChatTabs from './ChatTabs'
import { Connection } from '../reducers/connections'


const ChatManager = ({ showForm, connections, actions }: Array<Connection>|any) => r.div(
    { className: 'chats' },
    [
        ChatTabs({tabs: connections.map(c => c.server), showForm: actions.showForm }),
        r.div({ className: `modal ${showForm ? 'visible' : 'hidden'}` }, [
            r.div({ className: 'overlay', onClick: e => actions.showForm(false) }),
            r(Login)
        ]),
        connections.map(connection => r(Chat, { ...connection, key: connection.server, actions }))
    ]
)
export default ChatManager
