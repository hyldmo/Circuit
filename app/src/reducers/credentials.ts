import { IActionMeta } from '../actions/types'

// TODO: Move this
export type Credentials = {
    readonly username: string
    readonly password?: string
    readonly server: string
    readonly channels?: string
    readonly port?: number
}
export type ComponentActions = {
    [propName: string]: any
}

const empty: Credentials = {
    username: '',
    password: '',
    server: '',
    channels: '',
    port: null
}

const credentials = (state: Credentials = empty, action: IActionMeta<string|number, keyof Credentials>): Credentials => {
    switch (action.type) {
        case 'UPDATE_CREDENTIALS':
            const newState = {
                ...state
            }
            newState[action.meta] = action.payload
            return  newState
        case 'CHANGE_VIEW_MODE':
            return empty
        default:
            return state
    }
}

export default credentials
