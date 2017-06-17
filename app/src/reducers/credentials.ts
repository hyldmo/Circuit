import { IActionMeta } from '../actions/types'

// TODO: Move this
export type Credentials = {
    readonly username: string
    readonly password?: string
    readonly server: string
    readonly port?: number
}
export type ComponentActions = {
    [propName: string]: any
}

const credentials = (state: Credentials = { username: '', server: '' }, action: IActionMeta<string|number, string>): Credentials => {
    switch (action.type) {
        case 'UPDATE_CREDENTIALS':
            const newState = {
                ...state
            }
            newState[action.meta] = action.payload
            return  newState
        default:
            return state
    }
}

export default credentials
