import * as React from 'react'
import Login from '../containers/Login'
import Chat from '../containers/Chat'
import ChatTabs from './ChatTabs'
import { Connection } from '../reducers/connections'
import { ViewMode } from '../reducers/viewMode'
import { Channel } from '../reducers/channel'

export interface ChatManagerProps {
    channels: Channel[]
    currentTab: string
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
            currentTab={props.currentTab}
            changeViewMode={props.actions.changeViewMode}
            changeTab={props.actions.changeTab}
            closeTab={props.actions.closeTab}
        />
        <Chat />
    </div>
)
export default ChatManager
