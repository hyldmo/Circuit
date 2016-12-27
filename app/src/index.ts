import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as r from 'r-dom'
import { Provider } from 'react-redux'

import App from './containers/App'
import configureStore from './configureStore'

const initialState = {
    credentials: {
        server: 'irc.freenode.net',
        port: 6667,
        username: `testuser${Math.round(Math.random() * 10000)}`
    },
    connections: []
}

const store = configureStore(initialState)

let render = () => {
    ReactDOM.render(
        r(Provider, { store: store }, [
            r(App)
        ]),
        document.getElementById('app')
    )
}

if (module.hot) {
    // Support hot reloading of components
    // and display an overlay for runtime errors
    const renderApp = render
    const renderError = (error) => {
        // TODO: Figure out to integrate with current electron error handler
    }

    render = () => {
        try {
            renderApp()
        }
        catch (error) {
            renderError(error)
        }
    }

    module.hot.accept('./containers/App', () => {
        setTimeout(render)
    })
}

render()
