import { Credentials } from '../reducers/credentials'
import { eventChannel, takeEvery, channel } from 'redux-saga'
import { take, call, put, fork, cancel, cancelled  } from 'redux-saga/effects'
import { receive, connected, connecting } from '../actions'
import { Action } from '../actions/types'


export default function* connectToServer () {
    const { credentials } = yield take('CONNECT')
    try {
        // const socket = new WebSocket(`ws://${credentials.server}:${credentials.port}`)
        const socket = new WebSocket('ws://echo.websocket.org')
        yield put(connecting(socket.url))
        const channel = yield call(connectChannel, socket)

        while (true) {
            yield take(channel)
            yield put(connected(socket.url))

            // Pretend server said hello TODO: Remove this
            socket.send('Connection successful. I will repeat anything you say.')
            yield fork(watchUserSentMessages, socket)
            yield fork(watchMessages, socket)
        }
    } finally {
        console.log('Disconnected')
    }
}

function* watchMessages (socket: WebSocket) {
    const channel = yield call(messageChannel, socket)
    try {
        while (true) {
            let message = yield take(channel)
            yield put(receive(socket.url, {
                sender: '<server>',
                timestamp: Date.now(),
                message
            }))
        }
    } finally {
        console.log('Disconnected')
    }
}

function* watchUserSentMessages (socket: WebSocket) {
    try {
        while (true) {
            let {message} = yield take((action: Action|any) => action.type === 'SEND_MESSAGE' && action.server === socket.url)
            socket.send(message)
        }
    } finally {
        console.log('Message failed')
    }
}


function* connectChannel(socket: WebSocket) {
    return eventChannel(emitter => {
        socket.onopen = event => {
            emitter(event)
        }
        // The subscriber must return an unsubscribe function
        return socket.close
    })
}


function* messageChannel(socket: WebSocket) {
    return eventChannel(emitter => {
        socket.onmessage = event => {
            emitter(event.data)
        }
        // The subscriber must return an unsubscribe function
        return socket.close
    })
}

