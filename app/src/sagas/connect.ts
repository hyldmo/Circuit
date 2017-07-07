import { returntypeof } from 'react-redux-typescript'
import { channel, eventChannel, takeEvery, Task } from 'redux-saga'
import { call, cancel, cancelled, fork, put, take  } from 'redux-saga/effects'
import { ClientMessage } from '../../irc/server'
import { Actions, Action } from '../actions'
import { Credentials } from '../reducers/credentials'
import watchMessages from './watchMessages'


export default function* watchConnects () {
    yield takeEvery('CONNECT', connectToServer)
}

const ConnectAction = returntypeof(Actions.connect)

function* connectToServer (action: typeof ConnectAction) {
    try {
        const { server, port, username, password, channels } = action.payload
        const URI = `ws://localhost:31130?server=${server}&port=${port}&username=${username}&password=${password}&channels=${encodeURIComponent(channels)}`
        const socket = new WebSocket(URI)
        yield put(Actions.connecting(socket.url))
        const channel = yield call(connectChannel, socket)

        while (true) {
            yield take(channel)
            yield put(Actions.connected(socket.url))
            const userMessageTask = yield fork(watchUserSentMessages, socket)
            const messageTask = yield fork(watchMessages, socket)
            yield take((a: Action) => a.type === 'CLOSE_TAB' && a.payload === socket.url)
            yield cancel(userMessageTask)
            yield cancel(messageTask)
        }
    } finally {
        console.log('Disconnected')
    }
}


function* watchUserSentMessages (socket: WebSocket) {
    const send = (message: ClientMessage) => socket.send(JSON.stringify(message))
    try {
        while (true) {
            const { payload, meta } = yield take((action: Action) => {
                return action.type === 'SEND_MESSAGE' && action.meta.server === socket.url
            })
            if (payload.startsWith('/'))
                send({
                    channel: 'STATUS',
                    message: payload.substring(1)
                })
            else
                send({
                    channel: meta.channel,
                    message: payload
                })
        }
    } finally {
        console.log(`Stopped watching messages to ${socket.url}`)
    }
}


function* connectChannel (socket: WebSocket) {
    return eventChannel(emitter => {
        socket.onopen = event => {
            emitter(event)
        }
        return socket.close
    })
}
