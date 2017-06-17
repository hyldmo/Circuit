import { combineReducers } from 'redux'
import connections, { Connection } from './connections'
import credentials, { Credentials } from './credentials'
import currentServer from './currentServer'
import viewMode, { ViewMode } from './viewMode'

export type State = {
    connections: Connection[]
    currentServer: string
    viewMode: ViewMode
    credentials: Credentials
}

const reducers = combineReducers({
    currentServer, viewMode, credentials, connections
})

export default reducers
