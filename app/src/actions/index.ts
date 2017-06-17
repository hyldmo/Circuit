import { Action, ActionMeta } from './types'
import { ViewMode } from '../reducers/viewMode'

export * from './chat'
export * from './connect'
export * from './tabs'

export function updateCredentials (field: string, value: string|number): ActionMeta<string|number, string> {
    return {
        type: 'UPDATE_CREDENTIALS',
        meta: field,
        payload: value
    }
}


export function changeViewMode (viewMode: ViewMode): Action<ViewMode> {
    return {
        type: 'CHANGE_VIEW_MODE',
        payload: viewMode
    }
}

export function changeServer (server: string): Action<string> {
    return {
        type: 'CHANGE_SERVER',
        payload: server
    }
}
