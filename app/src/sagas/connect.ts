import { Credentials } from '../reducers/credentials'
import { eventChannel, takeEvery, channel } from 'redux-saga'
import { take, call, put, fork, cancel, cancelled  } from 'redux-saga/effects'
import { receive, connected, connecting } from '../actions'
import { Action, ActionMeta } from '../actions/types'


export default function* watchConnects () {
    try {
        while (true) {
            const { credentials } = yield take('CONNECT')
            yield fork(connectToServer, credentials)
        }
    } catch (e) {
        console.log('Disconnected')
    }
}

function* connectToServer (credentials: Credentials) {
    try {
        // const socket = new WebSocket(`ws://${credentials.server}:${credentials.port}`)
        const socket = new WebSocket(`ws://echo.websocket.org?key=${Math.floor(Math.random() * 100)}`)
        yield put(connecting(socket.url))
        const channel = yield call(connectChannel, socket)

        while (true) {
            yield take(channel)
            yield put(connected(socket.url))
            console.log(`Connected to ${socket.url}`)
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
            let { message } = yield take((action: ActionMeta<string, string>) => action.type === 'SEND_MESSAGE' && action.meta === socket.url)
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
        return socket.close
    })
}


function* messageChannel(socket: WebSocket) {
    return eventChannel(emitter => {
        socket.onmessage = event => {
            emitter(event.data)
        }
        return socket.close
    })
}

