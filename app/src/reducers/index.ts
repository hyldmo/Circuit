import { combineReducers } from 'redux'
import credentials from './credentials'
import connections from './connections'
import currentServer from './currentServer'
import { currentTab } from './tabs'
import viewMode from './viewMode'

const reducers = combineReducers({
    currentTab, currentServer, viewMode, credentials, connections
})

export default reducers
