import * as React from 'react'
import Login from '../containers/Login'
import Chat from './Chat'
import ChatTabs from './ChatTabs'
import { Connection, Channel } from '../reducers/connections'
import { ViewMode } from '../reducers/viewMode'

export interface ChatManagerProps {
    channels: Array<Channel>
    currentTab: number
    actions: {
        writeMessage: Function
        sendMessage: Function
        changeViewMode: (channel: ViewMode) => void
        changeTab: Function
        closeTab: Function
    }
}

const ChatManager = (props: ChatManagerProps) => (
    <div className='channels'>
        <ChatTabs tabs={props.channels.map(c => c.name)}
            changeViewMode={props.actions.changeViewMode}
            changeTab={props.actions.changeTab}
            closeTab={props.actions.closeTab}
            currentTab={props.currentTab}
        />
        <Chat { ...props.channels[props.currentTab] } actions={props.actions} />
    </div>
)
export default ChatManager
