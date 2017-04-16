import { Action, ActionMeta } from './types'
import { IMessage } from '../reducers/channel'
import { Credentials } from '../reducers/credentials'
import { ViewMode } from '../reducers/viewMode'

export * from './connect'
export * from './tabs'

export function updateCredentials (field: string, value: string|number): ActionMeta<string|number, string> {
    return {
        type: 'UPDATE_CREDENTIALS',
        meta: field,
        payload: value
    }
}

export function writeMessage (server: string, channel: string, message: string): ActionMeta<string, {server, channel}> {
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

export function changeViewMode (viewMode: ViewMode): Action<ViewMode> {
    return {
        type: 'CHANGE_VIEW_MODE',
        payload: viewMode
    }
}

export function changeServer (server: string): Action<string> {
    return {
        type: 'CHANGE_SERVER',
        payload: server
    }
}
