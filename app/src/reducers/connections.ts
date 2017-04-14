import { Action, ActionMeta } from '../actions/types'

type TabAction = Action<number>
type ConnectionAction = ActionMeta<string&IMessage, {server, channel}>

export interface Connection {
    readonly server: string
    readonly state: State
    readonly channels: Array<Channel>
}

export interface Channel {
    name: string
    messages: Array<IMessage>
    userMessage: string
}

export interface IMessage {
    readonly message: string,
    readonly timestamp: number
    readonly sender: string
}

type State =
    'CONNECTING' |
    'CONNECTED' |
    'DISCONNECTED'

const channel = (state: Channel, action: ConnectionAction): Channel => {
    if (state.name !== action.meta.channel)
        return state

    switch (action.type) {
        case 'WRITE_MESSAGE':
            return {
                ...state,
                userMessage: action.payload
            }
        case 'SEND_MESSAGE':
            return {
                ...state,
                userMessage: ''
            }
        case 'RECEIVE_MESSAGE':
            return {
                ...state,
                messages: [
                    ...state.messages,
                    action.payload
                ]
            }
        default:
            return state
    }
}

const connection = (state: Connection, action: ConnectionAction): Connection => {
    if (state.server !== action.meta.server)
        return state

    switch (action.type) {
        case 'CONNECTING':
            return {
                ...state,
                status: 'CONNECTING'
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

const connections = (state: Array<Connection> = [], action: ConnectionAction&TabAction): Array<Connection> => {
    switch (action.type) {
        case 'CONNECTED':
            return [
                ...state,
                {
                    server: action.payload,
                    state: 'CONNECTED',
                    channels: [{ name: 'STATUS', messages: [], userMessage: '' }]
                }
            ]
        case 'CLOSE_TAB':
            return state.filter(c => c.server !== action.payload)

        case 'CONNECTING':
        case 'RECEIVE_MESSAGE':
        case 'SEND_MESSAGE':
        case 'WRITE_MESSAGE':
            return state.map(c => connection(c, action))
        default:
            return state
    }
}
export default connections
