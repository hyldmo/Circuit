import { IAction } from '../actions/types'

export type ViewMode =
    'ADD_CHANNEL' |
    'ADD_SERVER' |
    'DEFAULT'


export default function viewMode (state: ViewMode = 'DEFAULT', action: IAction<ViewMode>): ViewMode {
    switch (action.type) {
        case 'CHANGE_VIEW_MODE':
            return action.payload
        case 'CONNECT':
            return 'DEFAULT'
        default:
            return state
    }
}
