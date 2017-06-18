import * as irc from 'irc'
import * as url from 'url'
import * as WebSocket from 'ws'
import { CMD, COMMAND, paramSep } from './commands'
import { parseMessage, splitChannels  } from './parse'

const options = {
    port: 31130
}

type RawMessage = {
    prefix?: string // The prefix for the message (optional)
    nick?: string // The nickname portion of the prefix (optional)
    user?: string // The username portion of the prefix (optional)
    host?: string // The hostname portion of the prefix (optional)
    server: string // The servername (if the prefix was a servername)
    rawCommand: string // The command exactly as sent from the server
    command: string // Human readable version of the command
    commandType: 'normal'|'error'|'reply'// normal, error, or reply
    args: string[] // arguments to the command
}

export type WSMessage = {
    type: 'IRC'|'SERVER'
    data: string
}

export type ClientMessage = {
    channel: string
    message: string
}

const wss = new WebSocket.Server(options)
console.log(`Listening for websocket connections on port ${options.port}`)


wss.on('connection', (ws, req) => {
    const send = (message: WSMessage) => ws.send(JSON.stringify(message), err => err && console.error(err) )

    const { server, port, username, password, channels } = url.parse(req.url, true).query
    const client = new irc.Client(server, username, {
        port,
        channels: splitChannels(decodeURIComponent(channels)),
        debug: true,
        autoRejoin: true
    })

    console.log(`Connecting to ${server}:${port}`)
    send({
        type: 'SERVER',
        data: `Connecting to ${server}:${port}`
    })

    client.addListener('registered', (message: RawMessage) => {
        send({
            type: 'SERVER',
            data: `Connected to ${server}:${port}`
        })
    })

    client.addListener('message', (from: string, to: string, msg: string) => {
        const command = to.startsWith('#') ? 'MSG' : 'PRIVMSG'
        const message = [CMD, command, from, to, msg].join(paramSep)
        send({
            type: 'IRC',
            data: message
        })
    })

    client.addListener('raw', (msg: RawMessage) => {
        const message = [CMD, msg.command.toUpperCase(), ...msg.args].join(paramSep)
        send({
            type: 'IRC',
            data: message
        })
    })

    client.addListener('error', (message: RawMessage) => {
        send({
            type: 'IRC',
            data: message.command
        })
    })

    ws.onmessage = (message) => {
        const msg: ClientMessage = JSON.parse(message.data.toString())
        if (msg.channel === 'STATUS') {
            try {
                const [ cmd, ...args ] = msg.message.split(' ')
                client.send(cmd, ...args)
            } catch (e) {
                send({
                    type: 'SERVER',
                    data: e
                })
            }
        } else {
            client.say(msg.channel, msg.message)
        }
    }
})

wss.on('error', (error) => {
    console.warn(error)
})


export default wss
