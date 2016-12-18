import * as React from 'react'
import * as r from 'r-dom'
import Login from '../containers/login'

export interface Props {
    compiler: string
    framework: string
}

const AppComponent = (props: Props) => r.div([
        r.div({id: 'logo'}, [
            r.img({src: 'assets/logo.svg'}),
            r.h1('cIRCuit')
        ]),
        r.h1(`Hello from ${props.compiler} and ${props.framework}!`),
        r(Login)
    ]
)

export default AppComponent
