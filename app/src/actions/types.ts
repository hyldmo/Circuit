type ActionType =
    'UPDATE_CREDENTIALS' |
    'CONNECT' |
    'CONNECTING' |
    'CONNECTED' |
    'DISCONNECTED' |
    'RECEIVE_MESSAGE' |
    'SEND_MESSAGE' |
    'WRITE_MESSAGE' |
    'CHANGE_VIEW_MODE' |
    'CHANGE_SERVER' |
    'CHANGE_TAB' |
    'CLOSE_TAB'

export interface Action<T> extends ReduxActions.Action<T> {
    readonly type: ActionType
}

export interface ActionMeta<Payload, Meta> extends ReduxActions.ActionMeta<Payload, Meta>  {
    readonly type: ActionType
}
