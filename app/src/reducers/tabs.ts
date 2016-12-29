import { Action } from '../actions/types'

export const showForm = (state: boolean = false, action: Action<boolean>): boolean => {
    switch (action.type) {
        case 'SHOW_CREDENTIALS_FORM':
            return action.payload
        case 'CONNECT':
            return false
        default:
            return state
    }
}

export const currentTab = (state: number = 0, action: Action<number>): number => {
    switch (action.type) {
        case 'CHANGE_TAB':
            return action.payload
        default:
            return state
    }
}

