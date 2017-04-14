import * as React from 'react'
import Login from '../containers/Login'
import Chat from './Chat'
import ChatTabs from './ChatTabs'
import { Connection, Channel } from '../reducers/connections'

export interface ChatManagerProps {
    channels: Array<Channel>
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
    <div className='channels'>
        <ChatTabs tabs={props.channels.map(c => c.name)}
            showForm={props.actions.showForm}
            changeTab={props.actions.changeTab}
            closeTab={props.actions.closeTab}
            currentTab={props.currentTab}
        />
        <Chat { ...props.channels[props.currentTab] } actions={props.actions} />
    </div>
)
export default ChatManager
