import * as React from 'react'
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

const ChatManager = (props: ChatManagerProps) => (
    <div className='chats'>
            <ChatTabs tabs={props.connections.map(c => c.server)}
                showForm={props.actions.showForm}
                changeTab={props.actions.changeTab}
                closeTab={props.actions.closeTab}
                currentTab={props.currentTab}
            />
            <div className={`modal ${props.showForm ? 'visible' : 'hidden'}` }>
                <div className='overlay' onClick={e => props.actions.showForm(false) }/>
                <Login/>
            </div>
            <Chat { ...props.connections[props.currentTab] } actions={props.actions} />
    </div>
)
export default ChatManager
