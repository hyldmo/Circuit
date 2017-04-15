import * as React from 'react'
import ChatTab from './ChatTab'
import { ViewMode } from '../reducers/viewMode'

export interface ChatTabProps {
    tabs: string[]
    currentTab: string
    changeViewMode: (viewMode: ViewMode) => void
    changeTab: Function
    closeTab: Function
}

const ChatTabs = (props: ChatTabProps) => (
    <ul className='tabs'>
        {props.tabs.map((tab, index) =>
            <ChatTab key={index}
                name={tab}
                isActive={props.currentTab === tab}
                index={index}
                changeTab={props.changeTab}
                closeTab={props.closeTab}
                showClose={props.tabs.length > 1}
            />
        )}
        <li className='tabs__add' key='+' onClick={e => props.changeViewMode('ADD_CHANNEL')}>+</li>
    </ul>
)

export default ChatTabs
