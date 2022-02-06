import * as ReduxToolkit from '@reduxjs/toolkit'
import * as store from '~/store'
import * as entity from '~/entity'
import { v4 } from 'uuid'
const uuid = v4

export type State = {
    list: entity.Toast[]
}

export const append = ReduxToolkit.createAsyncThunk<
    entity.Toast,
    Omit<entity.Toast, 'id'>,
    store.AsyncThunkConfig<{ error: string }>
>('toast/append', async (args, thunkAPI) => {
    try {
        const id = uuid()
        if (args.variant === 'info') {
            thunkAPI.dispatch(sleepAndRemove(id))
        }
        return { id, ...args }
    } catch (err) {
        console.log(err)
        return thunkAPI.rejectWithValue(err as any)
    }
})

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const sleepAndRemove = ReduxToolkit.createAsyncThunk<
    void,
    string,
    store.AsyncThunkConfig<{ error: string }>
>('toast/sleepAndRemove', async (args, thunkAPI) => {
    try {
        await sleep(3000)
        thunkAPI.dispatch(remove(args))
        return
    } catch (err) {
        console.log(err)
        return thunkAPI.rejectWithValue(err as any)
    }
})

export const remove = ReduxToolkit.createAsyncThunk<
    string,
    string,
    store.AsyncThunkConfig<{ error: string }>
>('toast/remove', id => {
    return id
})

const initialState: State = {
    list: []
}

export const slice = ReduxToolkit.createSlice({
    name: 'toast',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(append.fulfilled, (state, action) => {
            state.list = [...state.list, action.payload]
        })
        builder.addCase(remove.fulfilled, (state, action) => {
            state.list = state.list.filter(v => v.id !== action.payload)
        })
    }
})
