import * as ReduxToolkit from '@reduxjs/toolkit'
import * as History from 'history'
import * as Reducer from './reducer'
import * as Middleware from './middleware'

export const createStore = (history: History.History) => {
    const { reducer } = Reducer.createReducer(history)
    const { middleware } = Middleware.createMiddleware(history)

    return ReduxToolkit.configureStore({
        reducer,
        middleware
    })
}

export type RootState = ReturnType<ReturnType<typeof createStore>['getState']>

export type AsyncThunkConfig<RejectValue = unknown> = {
    state: RootState
    dispatch: ReturnType<typeof createStore>['dispatch']
    rejectValue: RejectValue
}
