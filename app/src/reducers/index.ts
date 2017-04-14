import { combineReducers } from 'redux'
import credentials from './credentials'
import connections from './connections'
import currentServer from './currentServer'
import { currentTab, showForm } from './tabs'

const reducers = combineReducers({
    currentTab, currentServer, showForm, credentials, connections
})

export default reducers
