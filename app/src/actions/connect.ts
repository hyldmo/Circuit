import { Action, ActionMeta } from './types'
import { Credentials } from '../reducers/credentials'

export function connect (credentials: Credentials): Action<Credentials> {
    return {
        type: 'CONNECT',
        payload: credentials
    }
}

export function connecting (server: string): ActionMeta<undefined, string> {
    return {
        type: 'CONNECTING',
        meta: server
    }
}

export function connected (server: string): Action<string> {
    return {
        type: 'CONNECTED',
        payload: server
    }
}
