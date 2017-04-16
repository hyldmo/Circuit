import { connect } from 'react-redux'
import ChatComponent, { ChatManagerProps } from '../components/ChatManager'
import { sendMessage, writeMessage, changeViewMode, changeTab, closeTab } from '../actions'
import { State } from '../reducers'

const mapStateToProps = (state: State) => {
    const server = state.connections.find(c => c.server === state.currentServer)
    return {
        ...server
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            writeMessage: (server, channel, message) => {
                dispatch(writeMessage(server, channel, message))
            },
            sendMessage: (server, channel, message) => {
                dispatch(sendMessage(server, channel, message))
            },
            changeViewMode: (show) => {
                dispatch(changeViewMode(show))
            },
            changeTab: (name, server) => {
                dispatch(changeTab(name, server))
            },
            closeTab: (url) => {
                dispatch(closeTab(url))
            }
        }
    }
}

const Chat = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatComponent)

export default Chat
