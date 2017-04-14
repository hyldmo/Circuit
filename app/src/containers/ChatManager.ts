import { connect } from 'react-redux'
import ChatComponent from '../components/ChatManager'
import { sendMessage, writeMessage, changeViewMode, changeTab, closeTab } from '../actions'

const mapStateToProps = (state) => {
    return {
        channels: state.connections.find(c => c.server === state.currentServer).channels,
        currentTab: state.currentTab
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            writeMessage: (server, message) => {
                dispatch(writeMessage(server, message))
            },
            sendMessage: (server, message) => {
                dispatch(sendMessage(server, message))
            },
            changeViewMode: (show) => {
                dispatch(changeViewMode(show))
            },
            changeTab: (index) => {
                dispatch(changeTab(index))
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
