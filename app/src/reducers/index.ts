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
        default:
            return state
    }
}


const reducers = combineReducers({
    showForm, compiler, framework, credentials, connections
})

export default reducers
