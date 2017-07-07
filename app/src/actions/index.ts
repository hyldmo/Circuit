import { returntypeof } from 'react-redux-typescript'
import { Credentials } from '../reducers/credentials'
import { ViewMode } from '../reducers/viewMode'

import { createAction } from './actionCreator'
import chatActions from './chat'
import connectionActions from './connect'
import tabActions from './tabs'

const divActions = {
    updateCredentials: createAction<'UPDATE_CREDENTIALS', string|number, keyof Credentials>('UPDATE_CREDENTIALS'),
    changeViewMode: createAction<'CHANGE_VIEW_MODE', ViewMode>('CHANGE_VIEW_MODE'),
    changeServer: createAction<'CHANGE_SERVER', string>('CHANGE_SERVER')
}

export const Actions = {
    ...chatActions,
    ...connectionActions,
    ...tabActions,
    ...divActions
}

function resolveTypes (actions: typeof Actions) {
    const functions = Object.values(actions)
   const values = functions.map(action => action.type)
}


const resolvedTypes = Object.values(Actions).map(action => action.type)[0]


export type Action = typeof Actions[keyof typeof Actions];
export type AnyAction = { type: typeof resolvedTypes, payload: any, meta: any }
