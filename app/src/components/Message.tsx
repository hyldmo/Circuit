import * as React from 'react'
import { IMessage } from '../reducers/channel'

const Message: React.StatelessComponent<IMessage> = (props) => (
    <li className='message'>
        <span className='timestamp'>[{new Date(props.timestamp).toLocaleTimeString()}] </span>
        <span>{props.sender}: </span>
        <span>{props.message}</span>
    </li>
)

export default Message
