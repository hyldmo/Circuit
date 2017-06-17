import * as React from 'react'
import { connect } from 'react-redux'
import { returntypeof } from 'react-redux-typescript'

import { State } from '../reducers'
import Login from './Login'
import ServerManager from './ServerManager'


const mapStateToProps = (state: State) => {
    return {
        connections: state.connections
    }
}

const dispatchToProps = {}

const stateProps = returntypeof(mapStateToProps)
type Props = typeof stateProps & typeof dispatchToProps

const App: React.StatelessComponent<Props> = (props) => {
    if (props.connections.length > 0) {
        return <ServerManager />
    } else {
        return (
            <div>
                <div id='logo'>
                    <img src='assets/logo.svg'/>
                    <h1>cIRCuit</h1>
                </div>
                <Login />
            </div>
        )
    }
}

// FIXME: Typing connect shouldn't be needed
export default connect<any, typeof dispatchToProps, {}>(
    mapStateToProps,
    dispatchToProps
)(App)
