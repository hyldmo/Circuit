import { channel, eventChannel, takeEvery, Task } from 'redux-saga'
import { call, cancel, cancelled, fork, put, take  } from 'redux-saga/effects'
import parse from '../../irc/parse'
import { connected, connecting, receive } from '../actions'
import { IAction, IActionMeta } from '../actions/types'
import { Credentials } from '../reducers/credentials'
import watchMessages from './watchMessages'


export default function* watchConnects () {
    yield takeEvery('CONNECT', connectToServer)
}

function* connectToServer (action: IAction<Credentials>) {
    try {
        const { server, port, username, password } = action.payload
        const socket = new WebSocket(`ws://localhost:31130?server=${server}&port=${port}&username=${username}&password=${password}`)
        yield put(connecting(socket.url))
        const channel = yield call(connectChannel, socket)

        while (true) {
            yield take(channel)
            yield put(connected(socket.url))
            const userMessageTask = yield fork(watchUserSentMessages, socket)
            const messageTask = yield fork(watchMessages, socket)
            yield take((a: IAction<string>) =>  a.type === 'CLOSE_TAB' && a.payload === socket.url)
            yield cancel(userMessageTask)
            yield cancel(messageTask)
        }
    } finally {
        console.log('Disconnected')
    }
}


function* watchUserSentMessages (socket: WebSocket) {
    try {
        while (true) {
            const { payload, meta } = yield take((action: IActionMeta<string, {channel, server}>) => {
                return action.type === 'SEND_MESSAGE' && action.meta.server === socket.url
            })
            socket.send(`${meta.channel}=>${payload}`)
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
