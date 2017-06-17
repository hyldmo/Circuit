import { IAction, IActionMeta } from './types'

import { ViewMode } from '../reducers/viewMode'

export * from './chat'
export * from './connect'
export * from './tabs'

export function updateCredentials (field: string, value: string|number): IActionMeta<string|number, string> {
    return {
        type: 'UPDATE_CREDENTIALS',
        meta: field,
        payload: value
    }
}


export function changeViewMode (viewMode: ViewMode): IAction<ViewMode> {
    return {
        type: 'CHANGE_VIEW_MODE',
        payload: viewMode
    }
}

export function changeServer (server: string): IAction<string> {
    return {
        type: 'CHANGE_SERVER',
        payload: server
    }
}
