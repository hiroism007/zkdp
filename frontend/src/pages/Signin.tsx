import * as React from 'react'
import * as SigninTemplate from '~/templates/Signin'
import * as ReactRouter from 'react-router-dom'
import { useContext } from 'react'
import { MetaMaskContext } from '~providers/MetaMask'

export const Component = () => {
    const history = ReactRouter.useHistory()
    const { address, connect } = useContext(MetaMaskContext)

    React.useEffect(() => {
        if (address) history.push('/')
    }, [address, history])

    return <SigninTemplate.Component onClickConnect={connect} />
}
