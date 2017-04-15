import { combineReducers } from 'redux'
import credentials, { Credentials } from './credentials'
import connections, { Connection } from './connections'
import currentServer from './currentServer'
import viewMode, { ViewMode } from './viewMode'

export interface State {
    connections: Connection[]
    currentServer: string
    viewMode: ViewMode
    credentials: Credentials
}

const reducers = combineReducers({
    currentServer, viewMode, credentials, connections
})

export default reducers
