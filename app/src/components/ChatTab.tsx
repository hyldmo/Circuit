import * as React from 'react'

const ChatTab = ({name, isActive, index, changeTab, closeTab, showClose}) => (
    <div>
        <li className={isActive ? 'active' : 'inactive'}
            onClick={e => { if (!isActive) changeTab(index)}} >
            <span>{parseName(name)}</span>
            {showClose &&
                <button className='btn--close'  onClick={e => { e.stopPropagation(); closeTab(name) }}>
                    x
                </button>
            }
        </li>
    </div>
)


export function parseName(url: string): string {
    // lol
    let words
    if (url.startsWith('ws')) {
        const regex = /server=([\w.]+)&/i
        words = regex.exec(url)[1].split('.')
    }
    else {
       words = url.split('.')
    }
    if (words.length <= 1) {
        return url.toLowerCase()
    } else {
        let name = words.slice(0, -1).reduce((a, b) => a.length > b.length ? a : b)
        return name.toLowerCase()
    }
}

export default ChatTab
