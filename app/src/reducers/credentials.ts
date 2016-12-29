import { Action, ActionMeta } from '../actions/types'

// TODO: Move this
export interface Credentials {
    readonly username: string
    readonly password?: string
    readonly server: string
    readonly port?: number
}
export interface ComponentActions {
    [propName: string]: any
}

const credentials = (state: Credentials = { username: '', server: '' }, action: ActionMeta<string|number, string>): Credentials => {
    switch (action.type) {
        case 'UPDATE_CREDENTIALS':
            let newState = {
                ...state,
            }
            newState[action.meta] = action.payload
            return  newState
        default:
            return state
    }
}

export default credentials
