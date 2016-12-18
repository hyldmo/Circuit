import * as React from 'react'
import * as r from 'r-dom'
import { IMessage } from '../reducers/connections'

const Message = (props: IMessage) => r.li(
    { className: 'message' },
    [
        r.span(`${props.sender}: `),
        r.span(props.message)
    ]
)
export default Message
