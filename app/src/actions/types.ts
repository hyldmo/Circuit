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

export interface Action<T> extends ReduxActions.Action<T> {
    readonly type: ActionType
}

export interface ActionMeta<Payload, Meta> extends ReduxActions.ActionMeta<Payload, Meta>  {
    readonly type: ActionType
}
