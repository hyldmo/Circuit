import { applyMiddleware, createStore } from 'redux'
import * as createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers'
import SagaManager from './sagas/SagaManager'

// Allow require to be used in TS file
declare function require (name: string): any

/**
 * Based on the current environment variable, we need to make sure
 * to exclude any DevTools-related code from the production builds.
 * The code is envify'd - using 'DefinePlugin' in Webpack.
 */

const __DEV__ = process.env.NODE_ENV === 'development'

const logger = createLogger()
const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware, logger]

export default function configureStore (initialState = {}) {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(...middlewares)
    )

    // run sagas
    SagaManager.startSagas(sagaMiddleware)

    if (__DEV__ && module.hot) {
        // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
        module.hot.accept('./reducers', () =>
            store.replaceReducer(require('./reducers').default)
        )

        module.hot.accept('./sagas/SagaManager', () => {
            SagaManager.cancelSagas(store)
            require('./sagas/SagaManager').default.startSagas(sagaMiddleware)
        })
    }

    return store
}
