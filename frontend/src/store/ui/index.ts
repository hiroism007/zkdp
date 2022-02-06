import * as ReduxToolkit from '@reduxjs/toolkit'
import * as toast from './toast'

export type State = {
    toast: toast.State
}

export const reducer = ReduxToolkit.combineReducers<State>({
    toast: toast.slice.reducer
})
