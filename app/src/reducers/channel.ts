import { ConnectionAction } from './connections'
import { getRandomColor } from '../utils/color'

export interface Channel {
    readonly name: string
    readonly messages: IMessage[]
    readonly userMessage: string
    readonly users: User[]
}

export interface User {
    color: string
    name: string
}

export interface IMessage {
    readonly message: string,
    readonly timestamp: number
    readonly sender: string
}

export default function channel (state: Channel, action: ConnectionAction): Channel {
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
                userMessage: '',
                messages: [
                    ...state.messages,
                    {
                        message: action.payload,
                        sender: 'You',
                        timestamp: Date.now()
                    }
                ]
            }
        case 'GET_USERS': {
            return {
                ...state,
                users: action.payload.map(user => ({
                    name: user,
                    color: getRandomColor()
                }))
            }
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
