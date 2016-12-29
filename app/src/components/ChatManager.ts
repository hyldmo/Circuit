import * as React from 'react'
import * as r from 'r-dom'
import Login from '../containers/Login'
import Chat from './Chat'
import ChatTabs from './ChatTabs'
import { Connection } from '../reducers/connections'

export interface ChatManagerProps {
    connections: Array<Connection>
    showForm: boolean
    currentTab: number
    actions: {
        writeMessage: Function
        sendMessage: Function
        showForm: Function
        changeTab: Function
        closeTab: Function
    }
}

const ChatManager = (props: ChatManagerProps) => r.div(
    { className: 'chats' },
    [
        ChatTabs({
            tabs: props.connections.map(c => c.server),
            showForm: props.actions.showForm,
            changeTab: props.actions.changeTab,
            closeTab: props.actions.closeTab,
            currentTab: props.currentTab,
        }),
        r.div({ className: `modal ${props.showForm ? 'visible' : 'hidden'}` }, [
            r.div({ className: 'overlay', onClick: e => props.actions.showForm(false) }),
            r(Login)
        ]),
        r(Chat, { ...props.connections[props.currentTab], actions: props.actions })
    ]
)
export default ChatManager
