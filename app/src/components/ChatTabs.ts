import * as React from 'react'
import * as r from 'r-dom'

export interface ChatTabProps {
    tabs: Array<string>
    showForm: Function
}

const ChatTabs = (props: ChatTabProps) => r.ul(
    { className: 'tabs' },
    [
        props.tabs.map(tab => r.li({key: tab}, parseName(tab))),
        r.li({className: 'tabs__add', key: '+', onClick: e => props.showForm(true)}, '+')
    ]
)


function parseName(url: string): string {
    // lol
    let name = url.split('.').reduce((a, b) => a.length > b.length ? a : b)
    name = name[0].toUpperCase() + name.substring(1)
    return name
}

export default ChatTabs
