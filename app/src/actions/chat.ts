import {IActionMeta} from './types'

import {Message} from '../reducers/channel'

type ServerMeta = {
    server: string
    channel: string
}

export function writeMessage (server: string, channel: string, message: string): IActionMeta<string, ServerMeta> {
    return {
        type: 'WRITE_MESSAGE',
        meta: {server, channel},
        payload: message
    }
}

export function sendMessage (server: string, channel: string, message: string): IActionMeta<string, ServerMeta> {
    return {
        type: 'SEND_MESSAGE',
        meta: {server, channel},
        payload: message
    }
}

export function receive (server: string, channel: string, message: Message): IActionMeta<Message, ServerMeta> {
    return {
        type: 'RECEIVE_MESSAGE',
        meta: {server, channel},
        payload: message
    }
}

export function getUsers (server: string, channel: string, users: string[]): IActionMeta<string[], ServerMeta> {
    return {
        type: 'GET_USERS',
        meta: {server, channel},
        payload: users
    }
}
