import { IAction, IActionMeta } from './types'

import { Credentials } from '../reducers/credentials'

export function connect (credentials: Credentials): IAction<Credentials> {
    return {
        type: 'CONNECT',
        payload: credentials
    }
}

export function connecting (server: string): IActionMeta<undefined, string> {
    return {
        type: 'CONNECTING',
        meta: server
    }
}

export function connected (server: string): IAction<string> {
    return {
        type: 'CONNECTED',
        payload: server
    }
}
