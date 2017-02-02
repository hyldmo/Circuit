import * as React from 'react'
import ChatTab from './ChatTab'

export interface ChatTabProps {
    tabs: Array<string>
    currentTab: number
    showForm: Function
    changeTab: Function
    closeTab: Function
}

const ChatTabs = (props: ChatTabProps) => (
    <ul className='tabs'>
        {props.tabs.map((tab, index) =>
            <ChatTab key={index} name={tab} isActive={props.currentTab === index} index={index} changeTab={props.changeTab} closeTab={props.closeTab} showClose={props.tabs.length > 1} />
        )}
        <li className='tabs__add' key='+' onClick={e => props.showForm(true)}>+</li>
    </ul>
)

export default ChatTabs
