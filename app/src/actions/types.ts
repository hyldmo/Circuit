type ActionType =
    "UPDATE_CREDENTIALS"

export interface Action {
    readonly type: ActionType
    [propName: string]: any;
}
