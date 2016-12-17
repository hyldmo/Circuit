import { Action } from '../actions/types'

const username = (state: string = "", action: Action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const server = (state: string = "", action: Action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export interface Credentials {
    readonly username: string
    readonly password?: string
    readonly server: string
    readonly port?: number
    readonly actions?: ComponentActions
}
export interface ComponentActions {
    [propName: string]: any
}

const credentials = (state: Credentials = { username: "", server: "" }, action: any|Action): Credentials => {
    switch (action.type) {
        case "UPDATE_CREDENTIALS":
            let newState = {
                ...state,
            }
            newState[action.field] = action.value;
            return  newState;
        default:
            return state;
    }
}

export default credentials;