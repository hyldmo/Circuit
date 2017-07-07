import { Action, AnyAction } from '../actions'
import channel, { Channel, Message } from './channel'


export type Connection = {
    readonly server: string
    readonly state: State
    readonly channels: Channel[]
    readonly currentChannel: string
}

type State =
    'CONNECTING' |
    'CONNECTED' |
    'DISCONNECTED'

const connection = (state: Connection, action: Action): Connection => {
    if (state.server !== (action.meta as { server: string }).server)
        return state

    switch (action.type) {
        case 'TAB_ADDED':
            return {
                ...state,
                channels: [
                    ...state.channels,
                    {
                        messages: [],
                        name: action.payload,
                        userMessage: '',
                        users: []
                    }
                ]
            }
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
        case 'GET_USERS':
            return {
                ...state,
                channels: state.channels.map(c => channel(c, action))
            }
        default:
            return state
    }
}

const connections = (state: Connection[] = [], action: Action): Connection[] => {
    switch (action.type) {
        case 'CONNECTED':
            return [
                ...state,
                {
                    server: action.payload,
                    state: 'CONNECTED',
                    channels: [{ name: 'STATUS', messages: [], userMessage: '', users: [] }],
                    currentChannel: 'STATUS'
                }
            ]
        case 'CLOSE_TAB':
            return state.filter(c => c.server !== action.payload)
        case 'CHANGE_TAB':
        case 'CONNECTING':
        case 'RECEIVE_MESSAGE':
        case 'SEND_MESSAGE':
        case 'WRITE_MESSAGE':
        case 'CHANGE_TAB':
        case 'TAB_ADDED':
        case 'GET_USERS':
            return state.map(c => connection(c, action))
        default:
            return state
    }
}
export default connections
