import { ConnectionAction } from './connections'

export interface Channel {
    readonly name: string
    readonly messages: IMessage[]
    readonly userMessage: string
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
