import { Action } from '../actions/types'

export interface Connection {
    readonly server: string
    readonly messages: Array<string>
    readonly state: State
    readonly userMessage: string
}

type State =
    'CONNECTING' |
    'CONNECTED' |
    'DISCONNECTED'

const connection = (state: Connection, action: Action|any): Connection => {
    console.log('yo')
    switch (action.type) {
        case 'WRITE_MESSAGE':
            if (state.server !== action.server)
                return state
            return {
                ...state,
                userMessage: action.message
            }

        case 'SEND_MESSAGE':
            console.log('SEND_MESSSAGE')
            if (state.server !== action.server)
                return state
            return {
                ...state,
                userMessage: ''
            }
        default:
            return state
    }
}

const connections = (state: Array<Connection> = [], action: Action|any): Array<Connection> => {
    switch (action.type) {
        case 'CONNECTED':
            return [
                ...state,
                {
                    server: action.server,
                    messages: [ 'hello', 'world' ],
                    state: 'CONNECTED',
                    userMessage: ''
                }
            ]
        case 'SEND_MESSAGE':
        case 'WRITE_MESSAGE':
            return state.map(c => connection(c, action))
        default:
            return state
    }
}
export default connections
