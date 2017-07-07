import * as React from 'react'
import { connect } from 'react-redux'
import { returntypeof } from 'react-redux-typescript'

import { Actions } from '../actions'
import ChatTabs from '../components/ChatTabs'
import { State } from '../reducers'
import Chat from './Chat'

const mapStateToProps = (state: State) => {
    const server = state.connections.find(c => c.server === state.currentServer)
    return {
        ...server
    }
}

const dispatchToProps = {
    writeMessage: Actions.writeMessage,
    sendMessage: Actions.sendMessage,
    changeViewMode: Actions.changeViewMode,
    changeTab: Actions.changeTab,
    closeTab: Actions.closeTab
}

const stateProps = returntypeof(mapStateToProps)
type Props = typeof stateProps & typeof dispatchToProps


const ChatManager: React.StatelessComponent<Props> = (props) => (
    <div className='channels'>
        <ChatTabs tabs={props.channels.map(c => c.name)}
            currentTab={props.currentChannel}
            changeViewMode={props.changeViewMode}
            changeTab={name => props.changeTab(name, { server: props.server } )}
            closeTab={props.closeTab}
        />
        <Chat />
    </div>
)

export default connect<typeof stateProps, typeof dispatchToProps, {}>(
    mapStateToProps,
    dispatchToProps
)(ChatManager)
