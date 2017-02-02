import * as React from 'react'
import { IMessage } from '../reducers/connections'

const Message = (props: IMessage) => (
    <li className='message'>
        <span>{props.sender}: </span>
        <span>{props.message}</span>
    </li>
)

export default Message
