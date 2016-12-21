import { combineReducers } from 'redux'
import { Action } from '../actions/types'
import credentials from './credentials'
import connections from './connections'

const compiler = (state: string = 'TypeScript', action: Action) => {
    switch (action.type) {
        default:
            return state
    }
}

const framework = (state: string = 'React & Redux', action: Action) => {
    switch (action.type) {
        default:
            return state
    }
}

const showForm = (state: boolean = false, action: Action|any): boolean => {
    switch (action.type) {
        case 'SHOW_CREDENTIALS_FORM':
            return action.payload
        case 'CONNECT':
            return false
        default:
            return state
    }
}

const currentTab = (state: number = 0, action: Action|any): number => {
    switch (action.type) {
        case 'CHANGE_TAB':
            return action.payload
        default:
            return state
    }
}


const reducers = combineReducers({
    currentTab, showForm, compiler, framework, credentials, connections
})

export default reducers
