import { Action } from '../actions'

export type ViewMode =
    'ADD_CHANNEL' |
    'ADD_SERVER' |
    'DEFAULT'


export default function viewMode (state: ViewMode = 'DEFAULT', action: Action): ViewMode {
    switch (action.type) {
        case 'CHANGE_VIEW_MODE':
            return action.payload
        case 'CONNECT':
            return 'DEFAULT'
        default:
            return state
    }
}
