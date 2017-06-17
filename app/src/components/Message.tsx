import * as React from 'react'
import { Message as MessageType } from '../reducers/channel'

const Message: React.StatelessComponent<MessageType> = (props) => (
    <li className='message'>
        <span className='timestamp'>[{new Date(props.timestamp).toLocaleTimeString()}] </span>
        <span>{props.sender}: </span>
        <span>{props.message}</span>
    </li>
)

export default Message
