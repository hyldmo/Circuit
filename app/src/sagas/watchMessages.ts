import { channel, eventChannel, takeEvery, Task } from 'redux-saga'
import { call, cancel, cancelled, fork, put, take  } from 'redux-saga/effects'
import {CMD, COMMAND, paramSep} from '../../irc/commands'
import { WSMessage } from '../../irc/server'
import { Actions} from '../actions'

export default function* watchMessages (socket: WebSocket) {
    const msgChannel = yield call(messageChannel, socket)
    try {
        while (true) {
            const data = yield take(msgChannel)
            const msg: WSMessage = JSON.parse(data)
            if (msg.type === 'IRC') {
                const args: string[] = msg.data.split(paramSep).slice(1)
                const command = args.shift() as COMMAND
                console.log(command, args)
                switch (command) {
                    case 'JOIN':
                        yield put(Actions.tabAdded(args[0], { server: socket.url }))
                        break

                    case 'MSG': {
                        const [sender, channel, message] = args
                        yield put(Actions.receive(
                            {
                                sender,
                                message,
                                timestamp: Date.now()
                            },
                            {
                                channel,
                                server: socket.url
                            }
                        ))
                    }

                    case 'RPL_NAMREPLY':
                        const [_a, _b, channel, users] = args
                        yield put(Actions.getUsers(users.split(' '), { channel, server: socket.url }))
                        break

                    case 'PONG':
                        break

                    default:
                        yield put(Actions.receive(
                            {
                                sender: '<server>',
                                message: args[args.length - 1],
                                timestamp: Date.now()
                            },
                            {
                                channel: 'STATUS',
                                server: socket.url
                            }
                        ))
                        break
                }
            }


        }
    } finally {
        console.log(`Stopped watching messages from ${socket.url}`)
    }
}

function* messageChannel (socket: WebSocket) {
    return eventChannel(emitter => {
        socket.onmessage = event => {
            emitter(event.data)
            // TODO: Handle non-irc message events
        }
        return socket.close
    })
}

