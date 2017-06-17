import * as React from 'react'
import { ViewMode } from '../reducers/viewMode'
import ChatTab from './ChatTab'

export type ChatTabProps = {
    tabs: string[]
    currentTab: string
    changeViewMode: (viewMode: ViewMode) => void
    changeTab: (name: string) => void
    closeTab: (name: string) => void
}

const ChatTabs = (props: ChatTabProps) => (
    <ul className='tabs'>
        {props.tabs.map((tab, index) =>
            <ChatTab key={index}
                name={tab}
                isActive={props.currentTab === tab}
                changeTab={props.changeTab}
                closeTab={props.closeTab}
                showClose={props.tabs.length > 1}
            />
        )}
        <li className='tabs__add' key='+' onClick={e => props.changeViewMode('ADD_CHANNEL')}>+</li>
    </ul>
)

export default ChatTabs
