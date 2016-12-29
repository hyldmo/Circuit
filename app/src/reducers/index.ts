import { combineReducers } from 'redux'
import { Action } from '../actions/types'
import credentials from './credentials'
import connections from './connections'

const showForm = (state: boolean = false, action: Action<boolean>): boolean => {
    switch (action.type) {
        case 'SHOW_CREDENTIALS_FORM':
            return action.payload
        case 'CONNECT':
            return false
        default:
            return state
    }
}

const currentTab = (state: number = 0, action: Action<number>): number => {
    switch (action.type) {
        case 'CHANGE_TAB':
            return action.payload
        default:
            return state
    }
}


const reducers = combineReducers({
    currentTab, showForm, credentials, connections
})

export default reducers
