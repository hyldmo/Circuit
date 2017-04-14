import { Action, ActionMeta } from './types'
import { IMessage } from '../reducers/connections'
import { Credentials } from '../reducers/credentials'

export function updateCredentials (field: string, value: string|number): ActionMeta<string|number, string> {
    return {
        type: 'UPDATE_CREDENTIALS',
        meta: field,
        payload: value
    }
}

export function writeMessage (server: string, message: string): ActionMeta<string, string> {
    return {
        type: 'WRITE_MESSAGE',
        meta: server,
        payload: message
    }
}

export function sendMessage (server: string, message: string): ActionMeta<string, string> {
    return {
        type: 'SEND_MESSAGE',
        meta: server,
        payload: message
    }
}

export function connect (credentials: Credentials): Action<Credentials> {
    return {
        type: 'CONNECT',
        payload: credentials
    }
}

export function connecting (server: string): ActionMeta<undefined, {server}> {
    return {
        type: 'CONNECTING',
        meta: {server}
    }
}

export function connected (server: string): Action<string> {
    return {
        type: 'CONNECTED',
        payload: server
    }
}

export function receive (server: string, channel: string, message: IMessage): ActionMeta<IMessage, { server, channel }> {
    return {
        type: 'RECEIVE_MESSAGE',
        meta: {server, channel},
        payload: message
    }
}

export function changeViewMode (show: boolean): Action<boolean> {
    return {
        type: 'CHANGE_VIEW_MODE',
        payload: show
    }
}

export function changeServer (server: string): Action<string> {
    return {
        type: 'CHANGE_SERVER',
        payload: server
    }
}

export function changeTab (index: number): Action<number> {
    return {
        type: 'CHANGE_TAB',
        payload: index
    }
}

export function closeTab (url: string): Action<string> {
    return {
        type: 'CLOSE_TAB',
        payload: url
    }
}
