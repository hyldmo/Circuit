import * as React from 'react'
import { connect } from 'react-redux'
import { returntypeof } from 'react-redux-typescript'

import { addTabs, changeServer, changeViewMode } from '../actions'
import AddChannel from '../components/AddChannel'
import { parseName } from '../components/ChatTab'
import { State } from '../reducers'
import ChatManager from './ChatManager'
import Login from './Login'

const mapStateToProps = (state: State) => ({
    currentServer: state.currentServer,
    connections: state.connections,
    viewMode: state.viewMode
})

const dispatchToProps = {
    changeViewMode,
    changeServer,
    addChannels: addTabs // TODO
}


const stateProps = returntypeof(mapStateToProps)
type Props = typeof stateProps & typeof dispatchToProps


const viewModeComponent: React.StatelessComponent<Props> = (props) => {
    switch (props.viewMode) {
        case 'ADD_CHANNEL':
            return <AddChannel onSubmit={cs => props.addChannels(cs, props.currentServer)} />
        case 'ADD_SERVER':
            return <Login />
        case 'DEFAULT':
            return null
    }
}

const ServerManager: React.StatelessComponent<Props> = (props) => (
    <div className='chats'>
        <div className={`modal ${props.viewMode !== 'DEFAULT' ? 'visible' : 'hidden'}` }>
            <div className='overlay' onClick={e => props.changeViewMode('DEFAULT') }/>
            {viewModeComponent(props)}
        </div>
        <ul className='servers'>
            {props.connections.map(conn => (
                <li key={conn.server} onClick={e => props.changeServer(conn.server)}>
                    {parseName(conn.server).slice(0, 2)}
                </li>
            ))}
            <li onClick={e => props.changeViewMode('ADD_SERVER')}>+</li>
        </ul>
        <ChatManager />
    </div>
)

export default connect<typeof stateProps, typeof dispatchToProps, {}>(
    mapStateToProps,
    dispatchToProps
)(ServerManager)
