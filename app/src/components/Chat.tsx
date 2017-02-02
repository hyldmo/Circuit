import * as React from 'react'
import { Connection } from '../reducers/connections'
import Message from './Message'

// TODO: Fix prop passing in message and Connection|any
const Chat = (p: Connection|any) => (
    <div className='chat'>
        <ul className='chat__messages'>
            {p.props.messages.map((message, index) =>
                <Message key={index} sender={message.sender} message={message.message} timestamp={message.timestamp} />
            )}
        </ul>
        <div className='chat__box'>
            <input className='input' placeholder='Write message...' value={p.props.userMessage}
                onChange={e => p.actions.writeMessage(p.props.server, e.currentTarget.value)}
                onKeyDown={e => { if (e.key === 'Enter') p.actions.sendMessage(p.props.server, p.props.userMessage)}} />
            <button className='input input__btn' onClick={e => p.actions.sendMessage(p.props.server, p.props.userMessage)}>
                Send
            </button>
        </div>
    </div>
)

export default Chat
