import { IAction } from '../actions/types'

export default function currentServer (state = '', action: IAction<string>): string {
    switch (action.type) {
        case 'CONNECTED':
        case 'CHANGE_SERVER':
            return action.payload
        default:
            return state
    }
}

