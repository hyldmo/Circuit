import * as React from "react";
import * as ReactDOM from "react-dom";
import * as r from "r-dom";
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import App from "./containers/app";
import reducers from './reducers'

const initialState = {
    credentials: {
        server: 'irc.freenode.net',
        username: `testuser${Math.round(Math.random() * 10000)}`
    }
}

const store = createStore(reducers, initialState);

ReactDOM.render(
    r(Provider, { store: store }, [
        r(App)
    ]),
    document.getElementById("app")
);