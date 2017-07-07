import { createAction } from './actionCreator'

type ServerMeta = { server: string }

const ChatActions = {
    changeTab: createAction<'CHANGE_TAB', string, ServerMeta>('CHANGE_TAB'),
    addTabs: createAction<'ADD_TABS', string[], ServerMeta>('ADD_TABS'),
    tabAdded: createAction<'TAB_ADDED', string, ServerMeta>('TAB_ADDED'),
    closeTab: createAction<'CLOSE_TAB', string>('CLOSE_TAB'),
}

export default ChatActions
