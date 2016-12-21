import * as React from 'react'
import * as r from 'r-dom'

export interface ChatTabProps {
    tabs: Array<string>
    currentTab: number
    showForm: Function
    changeTab: Function
}

const ChatTabs = (props: ChatTabProps) => r.ul(
    { className: 'tabs' },
    [
        props.tabs.map((tab, index) =>
            r.li(
                {
                    className: props.currentTab === index ? 'active' : 'inactive',
                    key: index,
                    onClick: e => props.changeTab(index)
                },
                parseName(tab)
            )
        ),
        r.li({className: 'tabs__add', key: '+', onClick: e => props.showForm(true)}, '+')
    ]
)


function parseName(url: string): string {
    // lol
    let name = url.split('.').slice(0, -1).reduce((a, b) => a.length > b.length ? a : b)
    name = name[0].toUpperCase() + name.substring(1)
    return name
}

export default ChatTabs
