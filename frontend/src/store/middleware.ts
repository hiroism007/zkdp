import * as ReduxToolkit from '@reduxjs/toolkit'
import * as ConnectedReactRouter from 'connected-react-router'
import * as History from 'history'

export const createMiddleware = (history: History.History) => {
    const middleware = ReduxToolkit.getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false
        // thunk: {}
    }).concat(ConnectedReactRouter.routerMiddleware(history))
    return { middleware }
}
