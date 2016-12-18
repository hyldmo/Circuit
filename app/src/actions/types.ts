type ActionType =
    'UPDATE_CREDENTIALS' |
    'CONNECT' |
    'CONNECTING' |
    'CONNECTED' |
    'DISCONNECTED' |
    'RECEIVE_MESSAGE' |
    'SEND_MESSAGE' |
    'WRITE_MESSAGE'

export interface Action {
    readonly type: ActionType
    [propName: string]: any
}
