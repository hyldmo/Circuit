import * as React from 'react'
import { connect } from 'react-redux'
import { returntypeof } from 'react-redux-typescript'

import { sendMessage, writeMessage } from '../actions'
import Message from '../components/Message'
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

const dispatchToProps = {
    writeMessage,
    sendMessage
}

const stateProps = returntypeof(mapStateToProps)
type Props = typeof stateProps & typeof dispatchToProps


const Chat: React.StatelessComponent<Props> = (props) => (
    <div className='chat'>
        <div className='chat__window'>
            <ul className='chat__window__messages'>
                {props.messages.map((message, index) =>
                    <Message { ...message} key={index} />
                )}
            </ul>
            {props.name !== 'STATUS' &&
                <ul className='chat__window__users'>
                    {props.users.map((user) =>
                        <li key={user.name} style={{color: user.color.toString()}}>{user.name}</li>
                    )}
                </ul>
            }
        </div>
        <div className='chat__box'>
            <input className='input' placeholder='Write message...' value={props.userMessage}
                onChange={e => props.writeMessage(props.server, props.name, e.currentTarget.value)}
                onKeyDown={e => { if (e.key === 'Enter') props.sendMessage(props.server, props.name, props.userMessage)}} />
            <button className='input input__btn' onClick={e => props.sendMessage(props.server, props.name, props.userMessage)}>
                Send
            </button>
        </div>
    </div>
)

export default connect<typeof stateProps, typeof dispatchToProps, {}>(
    mapStateToProps,
    dispatchToProps
)(Chat)
