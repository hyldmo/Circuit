import * as React from 'react'
import { Connection } from '../reducers/connections'
import Message from './Message'

// TODO: Fix Connection|any
const Chat = (props: Connection|any) => (
    <div className='chat'>
        <ul className='chat__messages'>
            {props.messages.map((message, index) =>
                <Message { ...message} key={index}  />
            )}
        </ul>
        <div className='chat__box'>
            <input className='input' placeholder='Write message...' value={props.userMessage}
                onChange={e => props.actions.writeMessage(props.server, e.currentTarget.value)}
                onKeyDown={e => { if (e.key === 'Enter') props.actions.sendMessage(props.server, props.userMessage)}} />
            <button className='input input__btn' onClick={e => props.actions.sendMessage(props.server, props.userMessage)}>
                Send
            </button>
        </div>
    </div>
)

export default Chat
