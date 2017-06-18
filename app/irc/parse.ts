export interface IrcMessage {
    message: string
    sender: string
    channel: string
}

export default function parseMessage (ircMessage: string): IrcMessage {
    const regex = /(\w+)=>(.*):(.*)/g
    const result = ircMessage.match(regex)
    if (!result) return null
    const [sender, channel, message] = result
    return {
        sender,
        channel,
        message
    }
}

export function splitChannels (channels: string): string[] {
    return channels.split(',').map(c => c.trim())
}
