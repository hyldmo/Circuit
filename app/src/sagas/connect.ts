import { Credentials } from '../reducers/credentials'
import { eventChannel, takeEvery, channel, Task } from 'redux-saga'
import { take, call, put, fork, cancel, cancelled  } from 'redux-saga/effects'
import { receive, connected, connecting } from '../actions'
import { Action, ActionMeta } from '../actions/types'
import watchMessages from './watchMessages'
import parse from '../../irc/parse'


export default function* watchConnects () {
    yield takeEvery('CONNECT', connectToServer)
}

function* connectToServer (action: Action<Credentials>) {
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
            yield take((action: Action<string>) =>  action.type === 'CLOSE_TAB' && action.payload === socket.url)
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
            let { payload } = yield take((action: ActionMeta<string, string>) => {
                return action.type === 'SEND_MESSAGE' && action.meta === socket.url
            })
            socket.send(payload)
        }
    } finally {
        console.log(`Stopped watching messages to ${socket.url}`)
    }
}


function* connectChannel(socket: WebSocket) {
    return eventChannel(emitter => {
        socket.onopen = event => {
            emitter(event)
        }
        return socket.close
    })
}



