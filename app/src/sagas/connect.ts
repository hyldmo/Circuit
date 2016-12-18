import { Credentials } from '../reducers/credentials'
import { eventChannel, takeEvery, channel } from 'redux-saga'
import { take, call, put, fork, cancel, cancelled  } from 'redux-saga/effects'
import { receive, connected, connecting } from '../actions'


export default function* connectToServer () {
    const { credentials } = yield take('CONNECT')
    try {
        // const socket = new WebSocket(`ws://${credentials.server}:${credentials.port}`)
        const socket = new WebSocket('ws://echo.websocket.org')
        yield put(connecting(socket.url))
        const channel = yield call(connect, socket)

        while (true) {
            yield take(channel)
            yield put(connected(socket.url))
            yield fork(handleConnect, socket)
        }
    } finally {
        console.log('Disconnected')
    }
}

function* handleConnect (socket: WebSocket) {
    const channel = yield call(watchMessages, socket)
    try {
        while (true) {
            let message = yield take(channel)
            yield put(receive(message))
        }
    } finally {
        console.log('Disconnected')
    }
}


function* connect(socket: WebSocket) {
    return eventChannel(emitter => {
        socket.onopen = event => {
            emitter(event)
        }
        // The subscriber must return an unsubscribe function
        return socket.close
    })
}


function* watchMessages(socket: WebSocket) {
    return eventChannel(emitter => {
        socket.onmessage = event => {
            emitter(event.data)
        }
        // The subscriber must return an unsubscribe function
        return socket.close
    })
}

