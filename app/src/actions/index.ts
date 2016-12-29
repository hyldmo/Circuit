import { Action, ActionMeta } from './types'
import { IMessage } from '../reducers/connections'

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

export function connecting (server: string): Action<string> {
    return {
        type: 'CONNECTING',
        payload: server
    }
}

export function connected (server: string): Action<string> {
    return {
        type: 'CONNECTED',
        payload: server
    }
}

export function receive (server: string, message: IMessage): ActionMeta<IMessage, string> {
    return {
        type: 'RECEIVE_MESSAGE',
        meta: server,
        payload: message
    }
}

export function showForm (show: boolean): Action<boolean> {
    return {
        type: 'SHOW_CREDENTIALS_FORM',
        payload: show
    }
}

export function changeTab (index: number): Action<number> {
    return {
        type: 'CHANGE_TAB',
        payload: index
    }
}