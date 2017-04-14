import { Action } from '../actions/types'

export default function currentServer (state = '', action: Action<string>): string {
    switch (action.type) {
        case 'CONNECTED':
        case 'CHANGE_SERVER':
            return action.payload
        default:
            return state
    }
}

