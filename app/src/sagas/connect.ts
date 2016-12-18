import { Credentials } from '../reducers/credentials'
import { put, call } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'

function* connectToServer (credentials: Credentials) {
    try {
        const ws = new WebSocket(`${credentials.server}:${credentials.port}`)
        yield call(ws.onopen)
        yield put({type: 'USER_FETCH_SUCCEEDED', user: credentials.username})
    } catch (e) {
        yield put({type: 'USER_FETCH_FAILED', message: e.message})
    }
}

export function* watchMessagesSaga() {

    yield takeEvery('CONNECT', connectToServer)
}
