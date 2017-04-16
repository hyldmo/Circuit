import { Action, ActionMeta } from './types'
import { IMessage } from '../reducers/channel'
import { Credentials } from '../reducers/credentials'
import { ViewMode } from '../reducers/viewMode'

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
