import * as ReduxToolkit from '@reduxjs/toolkit'

import * as ConnectedReactRouter from 'connected-react-router'
import * as History from 'history'
import * as Ui from './ui'

export const createReducer = (history: History.History) => {
    const reducer = ReduxToolkit.combineReducers({
        router: ConnectedReactRouter.connectRouter(history),
        ui: Ui.reducer
    })
    return { reducer }
}
