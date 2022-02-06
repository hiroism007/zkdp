import * as React from 'react'
import * as HomeTemplate from '~/templates/Home'
import * as reactRouter from 'react-router-dom'
import * as firebase from '~/modules/firebase'
import { MetaMaskContext } from '~providers/MetaMask'
import { Event } from '~entity/event'
import { SelectChangeEvent } from '@mui/material'
import { NFT } from '~entity/nft'
import { apiClient } from '~modules/apiClient'
import { buildInput } from '~modules/zk'
import * as proofJSON from '~assets/proof.json'
import * as publicJSON from '~assets/public.json'
import { nanoid } from 'nanoid'

const db = firebase.app.firestore()

export const Component = () => {
    const history = reactRouter.useHistory()
    const { connected, address } = React.useContext(MetaMaskContext)

    const [loading, setLoading] = React.useState<boolean>(false)
    const [snackOpen, setSnackOpen] = React.useState<boolean>(false)
    const [message, setMessage] = React.useState<string>('')

    const [events, setEvents] = React.useState<Event[]>([])
    const [eventId, setEventId] = React.useState<string>('')
    const [nfts, setNFTs] = React.useState<NFT[]>([])
    const [tokenId, setTokenId] = React.useState<string>('')
    const [nft, setNFT] = React.useState<NFT | null>(null)

    const [input, setInput] = React.useState<any>()
    const [proof, setProof] = React.useState<string>('')

    React.useEffect(() => {
        if (!connected) {
            history.push('/signin')
        }
    }, [connected, history])

    React.useEffect(() => {
        db.collection('events')
            .get()
            .then(r => {
                const events = r.docs.map(d => d.data())
                setEvents(events as Event[])
            })
    }, [])

    React.useEffect(() => {
        if (!eventId) return
        apiClient
            .get('/nft', {
                params: {
                    owner: address,
                    ca: eventId
                }
            })
            .then(r => {
                if (!r.data.assets) return
                setNFTs(
                    r.data.assets.map((r: any) => ({
                        address: r.contract.address,
                        tokenId: r.token_id,
                        imageUrl: r.image_url
                    }))
                )
            })
    }, [address, eventId])

    const onChangeItem = (event: SelectChangeEvent) => {
        setEventId(event.target.value)
    }

    const onChangeNFT = (event: SelectChangeEvent) => {
        setTokenId(event.target.value)
        const nft = nfts.find(r => r.tokenId === event.target.value)
        setNFT(nft as NFT)
    }

    const onCloseMessage = React.useCallback(() => {
        setSnackOpen(false)
        setMessage('')
    }, [])

    const onStartProof = React.useCallback(async () => {
        if (!address || !tokenId || !eventId) return
        try {
            setLoading(true)
            const current = events.find(r => r.contractAddress === eventId)
            if (!current) return
            const input = await buildInput(current.tokenIds, tokenId)
            setInput(input)
            setSnackOpen(true)
            // TODO because generating proof takes time for presentations,
            // TODO I use already-generated proof for the demo
            // const { proof, publicSignals } = await axios.post(
            //     'http://localhost:8080/proof',
            //     {
            //         input: input
            //     }
            // )
            const qrStr = JSON.stringify({
                proof: proofJSON,
                publicSignals: publicJSON
            })

            setMessage('Proof generated!')
            setSnackOpen(true)
            const id = nanoid(16)
            await db.collection('proofs').doc(id).set({
                jsonStr: qrStr
            })
            setProof(id)
        } catch (e) {
            console.error(e)
            setMessage('Failed to generate the input..')
            setSnackOpen(true)
        }
        setLoading(false)
    }, [address, tokenId, eventId, events])

    return (
        <HomeTemplate.Component
            proofId={proof}
            input={input}
            loading={loading}
            snackOpen={snackOpen}
            eventId={eventId}
            events={events}
            nft={nft}
            nfts={nfts}
            tokenId={tokenId}
            onChangeEvent={onChangeItem}
            onChangeToken={onChangeNFT}
            onStartProof={onStartProof}
            message={message}
            onCloseMessage={onCloseMessage}
        />
    )
}
