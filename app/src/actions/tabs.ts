import { IAction, IActionMeta } from './types'

type ServerMeta = { server: string }

export function changeTab (name: string, server: string): IActionMeta<string, ServerMeta> {
    return {
        type: 'CHANGE_TAB',
        payload: name,
        meta: {server}
    }
}

export function addTabs (names: string[], server: string): IActionMeta<string[], ServerMeta> {
    return {
        type: 'ADD_TABS',
        payload: names,
        meta: {server}
    }
}

export function tabAdded (name: string, server: string): IActionMeta<string, ServerMeta> {
    return {
        type: 'TAB_ADDED',
        payload: name,
        meta: {server}
    }
}

export function closeTab (url: string): IAction<string> {
    return {
        type: 'CLOSE_TAB',
        payload: url
    }
}
