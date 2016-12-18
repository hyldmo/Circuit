import { connect } from 'react-redux'
import ChatComponent from '../components/ChatManager'
import {sendMessage, writeMessage} from '../actions'
import {AppProps} from '../components/App'

const mapStateToProps = (state) => {
    return {
        connections: state.connections
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
            }
        }
    }
}

const Chat = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatComponent)

export default Chat
