import * as WebSocket from 'ws'
import * as url from 'url'
import * as irc from 'irc'

const options = {
    port: 31130
}

const wss = new WebSocket.Server(options)
console.log(`Listening for websocket connections on port ${options.port}`)

wss.on('connection', ws => {
    const { server, port, username, password } = url.parse(ws.upgradeReq.url, true).query
    const client = new irc.Client(server, username, {
        port,
        channels: ['###test'],
        debug: true,
        autoRejoin: true
    })
    console.log(`Connecting to ${server}:${port}`)
    client.addListener('registered', function (from, to, message) {
        ws.send(`Connected to ${server}:${port}`)
    })

    client.addListener('message', (from, to, message) => {
        ws.send(`${from}=>${to}:${message}`)
    })

    client.addListener('error', message => {
        ws.send(message.command)
    })

    ws.on('message', message => {
        client.say('###test', message)
        ws.send(message)
    })
})

export default wss
