import * as WebSocket from 'ws'
import * as url from 'url'
import * as irc from 'irc'
import { CMD, COMMAND, paramSep } from './commands'


const options = {
    port: 31130
}

interface RawMessage {
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

const wss = new WebSocket.Server(options)
console.log(`Listening for websocket connections on port ${options.port}`)



wss.on('connection', ws => {
    const send = (message) => { ws.send(message, err => { if (err) console.error(err) }) }
    const { server, port, username, password } = url.parse(ws.upgradeReq.url, true).query
    const client = new irc.Client(server, username, {
        port,
        channels: ['###test'],
        debug: true,
        autoRejoin: true
    })

    console.log(`Connecting to ${server}:${port}`)
    send(`Connecting to ${server}:${port}`)

    client.addListener('registered', function (message: RawMessage) {
        send(`Connected to ${server}:${port} (${message.command})`)
    })

    client.addListener('message', function (from: string, to: string, msg: string) {
        const command = to.startsWith('#') ? 'MSG' : 'PRIVMSG'
        const message = [CMD, command, from, to, msg].join(paramSep)
        send(message)
    })

    client.addListener('raw', (msg: RawMessage) => {
        const message = [CMD, msg.command.toUpperCase(), ...msg.args].join(paramSep)
        send(message)
    })

    client.addListener('error', (message: RawMessage) => {
        send(message.command)
    })
})

wss.on('error', (error) => {
    console.warn(error)
})

export default wss
