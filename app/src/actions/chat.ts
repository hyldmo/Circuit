import { createAction } from './actionCreator'

import { Message } from '../reducers/channel'

type ServerMeta = {
    server: string
    channel: string
}

const ChatActions = {
    writeMessage: createAction<'WRITE_MESSAGE', string, ServerMeta>('WRITE_MESSAGE'),
    sendMessage: createAction<'SEND_MESSAGE', string, ServerMeta>('SEND_MESSAGE'),
    receive: createAction<'RECEIVE_MESSAGE', Message, ServerMeta>('RECEIVE_MESSAGE'),
    getUsers: createAction<'GET_USERS', string[], ServerMeta>('GET_USERS')
}

export default ChatActions