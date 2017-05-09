import { eventChannel, takeEvery, channel, Task } from 'redux-saga'
import { take, call, put, fork, cancel, cancelled  } from 'redux-saga/effects'
import {receive, connected, connecting, tabAdded, getUsers} from '../actions'
import {paramSep, COMMAND, CMD} from '../../irc/commands'
import parse from '../../irc/parse'

export default function* watchMessages (socket: WebSocket) {
    const msgChannel = yield call(messageChannel, socket)
    try {
        while (true) {
            const msg = yield take(msgChannel)

            if (msg.startsWith(CMD)) {
                const args: string[] = msg.split(paramSep).slice(1)
                const command = args.shift() as COMMAND
                console.log(command, args)
                switch (command) {
                    case 'JOIN':
                        yield put(tabAdded(args[0], socket.url))
                        break

                    case 'MSG': {
                        const [sender, channel, message] = args
                        yield put(receive(
                            socket.url,
                            channel,
                            {
                                sender,
                                message,
                                timestamp: Date.now()
                            }
                        ))
                    }

                    case 'RPL_NAMREPLY':
                        const [_a, _b, channel, users] = args
                        yield put(getUsers(socket.url, channel, users.split(' ')))
                        break

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
