import { connect } from 'react-redux'
import ChatComponent from '../components/ChatManager'
import {sendMessage, writeMessage, showForm} from '../actions'
import {AppProps} from '../components/App'

const mapStateToProps = (state) => {
    return {
        connections: state.connections,
        showForm: state.showForm
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
            showForm: (show) => {
                dispatch(showForm(show))
            }
        }
    }
}

const Chat = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatComponent)

export default Chat
