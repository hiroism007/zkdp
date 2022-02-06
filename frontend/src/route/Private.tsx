import * as React from 'react'
import { useContext } from 'react'
import { MetaMaskContext } from '~/providers/MetaMask'
import * as ReactRouter from 'react-router'

export const Route = ({ children, ...rest }: ReactRouter.RouteProps) => {
    const { address } = useContext(MetaMaskContext)
    return (
        <ReactRouter.Route
            {...rest}
            render={({ location }) =>
                address ? (
                    children
                ) : (
                    <ReactRouter.Redirect
                        to={{
                            pathname: '/signin',
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    )
}
