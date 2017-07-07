import { createAction } from './actionCreator'

import { Credentials } from '../reducers/credentials'

const ConnectActions = {
    connect: createAction<'CONNECT', Credentials>('CONNECT'),
    connecting: createAction<'CONNECTING', string>('CONNECTING'),
    connected: createAction<'CONNECTED', string>('CONNECTED'),
}

export default ConnectActions