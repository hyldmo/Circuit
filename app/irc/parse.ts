export interface IrcMessage {
    message: string
    sender: string
    channel: string
}

export default function parse(ircMessage: string): IrcMessage {
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
