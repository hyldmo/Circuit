import * as React from "react";
import * as r from "r-dom";

export interface Props {
    compiler: string;
    framework: string;
}

const AppComponent = (props: Props) => r.h1(`Hello from ${props.compiler} and ${props.framework}!`);

export default AppComponent