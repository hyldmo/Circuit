import { Action, ActionMeta } from './types'

export function changeTab (name: string, server: string): ActionMeta<string, {server}> {
    return {
        type: 'CHANGE_TAB',
        payload: name,
        meta: {server}
    }
}

export function addTabs (names: string[], server: string): ActionMeta<string[], {server}> {
    return {
        type: 'ADD_TABS',
        payload: names,
        meta: {server}
    }
}

export function tabAdded (name: string, server: string): ActionMeta<string, {server}> {
    return {
        type: 'TAB_ADDED',
        payload: name,
        meta: {server}
    }
}

export function closeTab (url: string): Action<string> {
    return {
        type: 'CLOSE_TAB',
        payload: url
    }
}
