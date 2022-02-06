import * as React from 'react'
import { ethers } from 'ethers'

declare global {
    interface Window {
        ethereum: any | undefined // metamask injects global ethereum
    }
}

type Provider = ethers.providers.Web3Provider
type Network = ethers.providers.Network
type Props = {
    children: React.ReactNode
}
type MetaMaskContextType = {
    connect: () => Promise<void>
    connected: boolean
    provider: Provider | null
    signer: ethers.Signer | null
    network: Network | null
    address: string | null
}

export const MetaMaskContext = React.createContext<MetaMaskContextType>({
    connect: async () => {},
    provider: null,
    signer: null,
    network: null,
    address: null,
    connected: false
})

export const MetaMaskProvider = ({ children }: Props) => {
    const [connected, setConnected] = React.useState<boolean>(false)
    const [provider, setProvider] = React.useState<Provider | null>(null)
    const [signer, setSigner] = React.useState<ethers.Signer | null>(null)
    const [network, setNetwork] = React.useState<Network | null>(null)
    const [address, setAddress] = React.useState<string | null>(null)

    const connect = async () => {
        try {
            await attemptConnection()
            window.ethereum.on('accountsChanged', () => {
                return attemptConnection()
            })
        } catch (error) {
            console.error(error)
            alert((error as Error).message)
        }
    }

    const attemptConnection = async () => {
        if (window.ethereum === undefined) {
            throw Error('MetaMask not found, please visit https://metamask.io/')
        }
        // make sure page refreshes when network is changed
        // https://github.com/MetaMask/metamask-extension/issues/8226
        window.ethereum.on('chainIdChanged', () => window.location.reload())
        window.ethereum.on('chainChanged', () => window.location.reload())
        window.ethereum.on('accountsChanged', () => window.location.reload())

        // get provider, address, and network
        const eProvider = new ethers.providers.Web3Provider(window.ethereum)
        await eProvider.send('eth_requestAccounts', [])
        const eSigner = await eProvider.getSigner()
        const address = await eSigner.getAddress()
        const eNetwork = await eProvider.getNetwork()
        // set states
        setAddress(address)
        setProvider(eProvider)
        setNetwork(eNetwork)
        setSigner(eSigner)
        setConnected(true)
    }

    React.useEffect(() => {
        if (window.ethereum) {
            window.ethereum
                .request({
                    method: 'eth_accounts'
                })
                .then((r: Array<any>) => {
                    if (r.length > 0) return connect()
                    return
                })
        }
    }, [])

    return (
        <MetaMaskContext.Provider
            value={{
                address,
                network,
                provider,
                signer,
                connected,
                connect
            }}
        >
            {children}
        </MetaMaskContext.Provider>
    )
}
