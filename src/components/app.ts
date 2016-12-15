import * as React from "react";
import * as r from "r-dom";

export interface Props {
    compiler: string;
    framework: string;
}

const AppComponent = (props: Props) => r.div([
        r.div({id: "logo"}, [
            r.img({src: 'logo.svg'}),
            r.h1('cIRCuit')
        ]),
        r.h1(`Hello from ${props.compiler} and ${props.framework}!`)
    ]
)

export default AppComponent