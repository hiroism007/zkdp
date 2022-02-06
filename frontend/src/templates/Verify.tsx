import * as React from 'react'
import * as MainLayout from '~/layouts/Main'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import QrReader from 'react-qr-reader'

import { Stack, Snackbar, Box, Typography } from '@mui/material'
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
    showReader: boolean
    onCloseMessage: () => void
    onChange: (proof: string | null) => void
    verified?: boolean
}

export const Component = (props: Props) => {
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
                        Verify without revealing your wallet address
                    </Typography>
                </Item>
                <Item>
                    {props.showReader && (
                        <QrReader
                            delay={500}
                            onError={() => {}}
                            onScan={r => {
                                props.onChange(r)
                            }}
                        />
                    )}
                </Item>
                <Item>
                    {props.verified && (
                        <Typography variant="h1" component="div" gutterBottom>
                            🦄VERIFIED🦄
                        </Typography>
                    )}
                </Item>
                <Item></Item>
            </Stack>
        </MainLayout.Component>
    )
}
