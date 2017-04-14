import { Action } from '../actions/types'

export const currentTab = (state: number = 0, action: Action<number>): number => {
    switch (action.type) {
        case 'CHANGE_TAB':
            return action.payload
        default:
            return state
    }
}

