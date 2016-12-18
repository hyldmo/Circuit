import { Action } from './types'

export function updateCredentials(field: string, value: string|number): Action {
    return {
        type: 'UPDATE_CREDENTIALS',
        field,
        value
    }
}
