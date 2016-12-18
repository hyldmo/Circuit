import { combineReducers } from 'redux'
import { Action } from '../actions/types'
import credentials from './credentials'

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


const reducers = combineReducers({
    compiler, framework, credentials
})

export default reducers
