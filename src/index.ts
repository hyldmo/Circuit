import * as React from "react";
import * as ReactDOM from "react-dom";
import * as r from "r-dom";
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import App from "./containers/app";
import reducers from './reducers'

const store = createStore(reducers);

ReactDOM.render(
    r(Provider, { store: store }, [
        r(App)
    ]),
    document.getElementById("app")
);