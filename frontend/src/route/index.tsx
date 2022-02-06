import * as React from 'react'
import * as ReactRouter from 'react-router-dom'
import * as History from 'history'
import { SnackbarProvider } from '~providers/Snackbar'
import * as ConnectedRouter from 'connected-react-router'
import { MetaMaskProvider } from '~/providers/MetaMask'

import * as PrivateRoute from './Private'
import * as Home from '~/pages/Home'
import * as Signin from '~/pages/Signin'
import * as Verify from '~/pages/Verify'

type Props = {
    history: History.History
}

export const Route = (props: Props): React.ReactElement => (
    <ConnectedRouter.ConnectedRouter history={props.history}>
        <SnackbarProvider>
            <MetaMaskProvider>
                <ReactRouter.Switch>
                    <PrivateRoute.Route exact path="/">
                        <Home.Component />
                    </PrivateRoute.Route>
                    <ReactRouter.Route exact path="/signin">
                        <Signin.Component />
                    </ReactRouter.Route>
                    <ReactRouter.Route exact path="/verify">
                        <Verify.Component />
                    </ReactRouter.Route>
                </ReactRouter.Switch>
            </MetaMaskProvider>
        </SnackbarProvider>
    </ConnectedRouter.ConnectedRouter>
)

export default Route
