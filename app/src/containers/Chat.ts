import { connect } from 'react-redux'
import ChatComponent, {ChatProps} from '../components/Chat'
import { sendMessage, writeMessage } from '../actions'
import { Connection } from '../reducers/connections'
import { State } from '../reducers'

const mapStateToProps = (state: State) => {
    const connection = state.connections.find(c => c.server === state.currentServer)
    const channel = connection.channels.find(c => c.name === connection.currentChannel)
    return {
        ...channel,
        server: connection.server,
        currentTab: connection.currentChannel
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
        }
    }
}

const Chat = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatComponent)

export default Chat
