import * as React from 'react'
import { Channel } from '../reducers/channel'
import Message from './Message'

export type ChatProps = PartialChatProps&Channel

interface PartialChatProps  {
    server: string
    actions: {
        writeMessage(server: string, channel: string, message: string)
        sendMessage(server: string, channel: string, message: string)
    }
}

// TODO: Fix Connection|any
const Chat = (props: ChatProps) => (
    <div className='chat'>
        <ul className='chat__messages'>
            {props.messages.map((message, index) =>
                <Message { ...message} key={index} />
            )}
        </ul>
        <div className='chat__box'>
            <input className='input' placeholder='Write message...' value={props.userMessage}
                onChange={e => props.actions.writeMessage(props.server, props.name, e.currentTarget.value)}
                onKeyDown={e => { console.log(e.key); if (e.key === 'Enter') props.actions.sendMessage(props.server, props.name, props.userMessage)}} />
            <button className='input input__btn' onClick={e => props.actions.sendMessage(props.server, props.name, props.userMessage)}>
                Send
            </button>
        </div>
    </div>
)

export default Chat
