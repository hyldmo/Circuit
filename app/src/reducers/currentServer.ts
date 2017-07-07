import { Action } from '../actions'

export default function currentServer (state = '', action: Action): string {
    switch (action.type) {
        case 'CONNECTED':
        case 'CHANGE_SERVER':
            return action.payload
        default:
            return state
    }
}

