import { eventChannel, takeEvery, channel, Task } from 'redux-saga'
import { take, call, put, fork, cancel, cancelled  } from 'redux-saga/effects'
import { receive, connected, connecting, tabAdded } from '../actions'
import {paramSep, COMMAND} from '../../irc/server'
import parse from '../../irc/parse'

export default function* watchMessages (socket: WebSocket) {
    const msgChannel = yield call(messageChannel, socket)
    try {
        while (true) {
            const message = yield take(msgChannel)

            if (message.startsWith('$CMD$')) {
                const args: string[] = message.split('_-_').slice(1)
                const command = args.shift() as COMMAND
                switch (command) {
                    case 'JOIN':
                        yield put(tabAdded(args[0], socket.url))
                        break
                    case 'MSG':
                        const { message, channel, sender } = parse(args[args.length - 1])
                        yield put(receive(
                            socket.url,
                            channel,
                            {
                                sender,
                                message,
                                timestamp: Date.now()
                            }
                        ))
                    case 'PONG':
                        break
                    default:
                        yield put(receive(
                            socket.url,
                            'STATUS',
                            {
                                sender: '<server>',
                                message: args[args.length - 1],
                                timestamp: Date.now()
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

function* messageChannel(socket: WebSocket) {
    return eventChannel(emitter => {
        socket.onmessage = event => {
            emitter(event.data)
            // TODO: Handle non-irc message events
        }
        return socket.close
    })
}

