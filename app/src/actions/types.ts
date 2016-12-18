type ActionType =
    'UPDATE_CREDENTIALS' |
    'CONNECT' |
    'CONNECTED' |
    'RECEIVE_MESSAGE' |
    'DISCONNECTED'

export interface Action {
    readonly type: ActionType
    [propName: string]: any
}
