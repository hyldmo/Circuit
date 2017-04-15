import { Action, ActionMeta } from '../actions/types'
import channel, { Channel, IMessage } from './channel'

type TabAction = Action<number>
export type ConnectionAction = ActionMeta<string&IMessage, {server, channel}>

export interface Connection {
    readonly server: string
    readonly state: State
    readonly channels: Channel[]
    readonly currentChannel: string
}

type State =
    'CONNECTING' |
    'CONNECTED' |
    'DISCONNECTED'

const connection = (state: Connection, action: ConnectionAction): Connection => {
    if (state.server !== action.meta.server)
        return state

    switch (action.type) {
        case 'CONNECTING':
            return {
                ...state,
                status: 'CONNECTING'
            }
        case 'CHANGE_TAB':
           return {
                ...state,
                currentChannel: action.payload
            }
        case 'WRITE_MESSAGE':
        case 'SEND_MESSAGE':
        case 'RECEIVE_MESSAGE':
            return {
                ...state,
                channels: state.channels.map(c => channel(c, action))
            }
        default:
            return state
    }
}

const connections = (state: Connection[] = [], action: ConnectionAction&TabAction): Connection[] => {
    switch (action.type) {
        case 'CONNECTED':
            return [
                ...state,
                {
                    server: action.payload,
                    state: 'CONNECTED',
                    channels: [{ name: 'STATUS', messages: [], userMessage: '' }],
                    currentChannel: 'STATUS'
                }
            ]
        case 'CLOSE_TAB':
            return state.filter(c => c.server !== action.payload)

        case 'CONNECTING':
        case 'RECEIVE_MESSAGE':
        case 'SEND_MESSAGE':
        case 'WRITE_MESSAGE':
        case 'CHANGE_TAB':
            return state.map(c => connection(c, action))
        default:
            return state
    }
}
export default connections
