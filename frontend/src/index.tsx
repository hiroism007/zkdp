import * as React from 'react'
import * as ReactRedux from 'react-redux'
import * as History from 'history'
import { render } from 'react-dom'
import Route from '~/route'
import * as Store from '~/store'
import * as Reset from '~/modules/reset'
import { SnackbarProvider } from '~/providers/Snackbar'

export const history = History.createBrowserHistory()
const store = Store.createStore(history)

const App = () => (
    <ReactRedux.Provider store={store}>
        <Reset.Component />
        <SnackbarProvider>
            <Route history={history} />
        </SnackbarProvider>
    </ReactRedux.Provider>
)
render(<App />, document.getElementById('root'))
