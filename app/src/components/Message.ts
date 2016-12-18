import * as React from 'react'
import * as r from 'r-dom'

const Message = (message) => r.li(
    { className: 'message' },
    [
        r.span('<username>: '),
        r.span(message)
    ]
)
export default Message
