import * as React from 'react'
import * as MainLayout from '~/layouts/Main'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import QRCode from 'react-qr-code'

import {
    Stack,
    Snackbar,
    SelectChangeEvent,
    Box,
    Typography,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    Card,
    CardMedia,
    CardActionArea,
    Button
} from '@mui/material'
import { Event } from '~entity/event'
import { NFT } from '~entity/nft'
import { styled } from '@mui/material/styles'

const Item = styled(Box)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
}))

type Props = {
    loading: boolean
    snackOpen: boolean
    message: string
    eventId: string
    events: Event[]
    tokenId: string
    nft: NFT | null
    nfts: NFT[]
    input?: any
    onChangeToken: (event: SelectChangeEvent) => void
    onChangeEvent: (event: SelectChangeEvent) => void
    onStartProof: () => void
    onCloseMessage: () => void
    proofId: string
}

export const Component = (props: Props) => {
    const EventOptions = React.useMemo(() => {
        return props.events.map(r => (
            <MenuItem key={r.contractAddress} value={r.contractAddress}>
                {r.title}
            </MenuItem>
        ))
    }, [props.events])

    const NFTOptions = React.useMemo(() => {
        return props.nfts.map(r => (
            <MenuItem key={r.tokenId} value={r.tokenId}>
                {r.tokenId}
            </MenuItem>
        ))
    }, [props.nfts])

    return (
        <MainLayout.Component>
            <Backdrop
                sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
                open={props.loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                open={props.snackOpen}
                autoHideDuration={4200}
                onClose={props.onCloseMessage}
            >
                <Alert
                    onClose={() => {}}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    {props.message}
                </Alert>
            </Snackbar>
            <Stack spacing={2}>
                <Item>
                    <Typography variant="h2" component="div" gutterBottom>
                        ZKDP - ZK Door on Polygon
                    </Typography>
                    <Typography variant="h3" component="div" gutterBottom>
                        Proof of Concept - NFT Ticketing & ZKP
                    </Typography>
                </Item>
                <Item>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Event
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={props.eventId}
                            label="Event"
                            onChange={props.onChangeEvent}
                        >
                            {EventOptions}
                        </Select>
                    </FormControl>
                </Item>
                <Item>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Token
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label2"
                            id="demo-simple-select2"
                            value={props.tokenId}
                            label="Token"
                            onChange={props.onChangeToken}
                        >
                            {NFTOptions}
                        </Select>
                    </FormControl>
                </Item>
                <Item>
                    {!props.proofId && props.nft && (
                        <Card
                            sx={{
                                maxWidth: 345,
                                marginRight: 'auto',
                                marginLeft: 'auto'
                            }}
                        >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    src={props.nft.imageUrl}
                                    alt="hoge"
                                />
                            </CardActionArea>
                        </Card>
                    )}
                </Item>
                <Item>
                    {!props.proofId && props.eventId && props.tokenId && (
                        <Button
                            variant={'outlined'}
                            fullWidth
                            color={'primary'}
                            onClick={props.onStartProof}
                        >
                            GENERATE ZK INPUT
                        </Button>
                    )}
                </Item>
                <Item>{props.proofId && <QRCode value={props.proofId} />}</Item>
            </Stack>
        </MainLayout.Component>
    )
}
