import * as React from 'react'

const ChatTab = ({name, isActive, index, changeTab, closeTab, showClose}) => (
    <div>
        <li className={isActive ? 'active' : 'inactive'}
            onClick={e => { if (!isActive) changeTab(index)}} >
            <span>{parseName(name)}</span>
                {showClose ?
                    <button className='btn--close'  onClick={e => { e.stopPropagation(); closeTab(name) }}>
                        x
                    </button>
                    : null
                }
            </li>
    </div>
)


function parseName(url: string): string {
    // lol
    let name = url.split('.').slice(0, -1).reduce((a, b) => a.length > b.length ? a : b)
    name = name[0].toUpperCase() + name.substring(1)
    return name
}

export default ChatTab
