import * as React from 'react'
import Login from '../containers/Login'
import Chat from '../containers/Chat'
import ChatTabs from './ChatTabs'
import { Connection } from '../reducers/connections'
import { ViewMode } from '../reducers/viewMode'
import { Channel } from '../reducers/channel'

export type ChatManagerProps = Connection&PartialChatManagerProps

interface PartialChatManagerProps {
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
            currentTab={props.currentChannel}
            changeViewMode={props.actions.changeViewMode}
            changeTab={name => props.actions.changeTab(name, props.server)}
            closeTab={props.actions.closeTab}
        />
        <Chat />
    </div>
)
export default ChatManager
