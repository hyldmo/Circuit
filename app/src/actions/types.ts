type ActionType =
    'UPDATE_CREDENTIALS' |
    'CONNECT' |
    'CONNECTING' |
    'CONNECTED' |
    'DISCONNECTED' |
    'RECEIVE_MESSAGE' |
    'SEND_MESSAGE' |
    'WRITE_MESSAGE' |
    'SHOW_CREDENTIALS_FORM' |
    'CHANGE_TAB'

export interface Action {
    readonly type: ActionType
    [propName: string]: any
}
