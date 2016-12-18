import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as r from 'r-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import App from './containers/app'
import reducers from './reducers'

const initialState = {
    credentials: {
        server: 'irc.freenode.net',
        username: `testuser${Math.round(Math.random() * 10000)}`
    }
}
const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducers, initialState, applyMiddleware(sagaMiddleware))

ReactDOM.render(
    r(Provider, { store: store }, [
        r(App)
    ]),
    document.getElementById('app')
)
