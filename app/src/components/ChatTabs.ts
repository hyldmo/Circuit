import * as React from 'react'
import * as r from 'r-dom'

const ChatTabs = (tabs) => r.ul(
    { className: 'tabs' },
    [
        tabs.map(tab => r.li({key: tab}, parseName(tab)))
    ]
)


function parseName(url: string): string {
    // lol
    let name = url.split('.').reduce((a, b) => a.length > b.length ? a : b)
    name = name[0].toUpperCase() + name.substring(1)
    return name
}

export default ChatTabs
