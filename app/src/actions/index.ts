import { Action } from './types'

export function updateCredentials (field: string, value: string|number): Action {
    return {
        type: 'UPDATE_CREDENTIALS',
        field,
        value
    }
}

export function writeMessage (server: string, message: string): Action {
    return {
        type: 'WRITE_MESSAGE',
        server,
        message
    }
}

export function sendMessage (server: string, message: string): Action {
    return {
        type: 'SEND_MESSAGE',
        server,
        message
    }
}



export function connecting (server: string): Action {
    return {
        type: 'CONNECTING', server
    }
}

export function connected (server: string): Action {
    return {
        type: 'CONNECTED', server
    }
}

export function receive (message: string): Action {
    return {
        type: 'RECEIVE_MESSAGE',
        message
    }
}
