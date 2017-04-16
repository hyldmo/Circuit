import {ActionMeta} from './types'
import {IMessage} from '../reducers/channel'

export function writeMessage(server: string, channel: string, message: string): ActionMeta < string, {server, channel} > {
    return {
        type: 'WRITE_MESSAGE',
        meta: {server, channel},
        payload: message
    }
}

export function sendMessage (server: string, channel: string, message: string): ActionMeta<string, {server, channel}> {
    return {
        type: 'SEND_MESSAGE',
        meta: {server, channel},
        payload: message
    }
}

export function receive (server: string, channel: string, message: IMessage): ActionMeta<IMessage, { server, channel }> {
    return {
        type: 'RECEIVE_MESSAGE',
        meta: {server, channel},
        payload: message
    }
}

export function getUsers (server: string, channel: string, users: string[]): ActionMeta<string[], { server, channel }> {
    return {
        type: 'GET_USERS',
        meta: {server, channel},
        payload: users
    }
}
