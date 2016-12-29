import { combineReducers } from 'redux'
import credentials from './credentials'
import connections from './connections'
import { currentTab, showForm } from './tabs'

const reducers = combineReducers({
    currentTab, showForm, credentials, connections
})

export default reducers
