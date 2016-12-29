import { Action, ActionMeta } from '../actions/types'

export interface Connection {
    readonly server: string
    readonly messages: Array<IMessage>
    readonly state: State
    readonly userMessage: string
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

const connection = (state: Connection, action: ActionMeta<string&IMessage, string>): Connection => {
    if (state.server !== action.meta)
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

const connections = (state: Array<Connection> = [], action: ActionMeta<string&IMessage, string>): Array<Connection> => {
    switch (action.type) {
        case 'CONNECTED':
            return [
                ...state,
                {
                    server: action.payload,
                    messages: [],
                    state: 'CONNECTED',
                    userMessage: ''
                }
            ]
        case 'RECEIVE_MESSAGE':
        case 'SEND_MESSAGE':
        case 'WRITE_MESSAGE':
            return state.map(c => connection(c, action))
        default:
            return state
    }
}
export default connections
