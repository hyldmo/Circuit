import * as React from 'react'
import * as r from 'r-dom'
import { Connection } from '../reducers/connections'
import Message from './Message'


const Chat = (props: Connection|any) => r.div({className: 'chat'}, [
    r.ul(
        { className: 'chat__messages' },
        props.messages.map(message => Message(message))
    ),
    r.div(
        { className: 'chat__box' },
        [
            r.input({
                className: 'input',
                placeholder: 'Write message...',
                value: props.userMessage,
                onChange: e => {
                    props.actions.writeMessage(props.server, e.target.value)
                },
                onKeyDown: e => {
                    if (e.key === 'Enter')
                        props.actions.sendMessage(props.server, props.userMessage)
                }
            }),
            r.button({
                className: 'input input__btn',
                onClick: e => {
                    props.actions.sendMessage(props.server, props.userMessage)
                }
            }, 'Send')
        ]
    ),
])

export default Chat
