import * as React from 'react'
import * as MainLayout from '~/layouts/Main'
import { Box, Button, Typography, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'

const Item = styled(Box)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
}))

type Props = {
    onClickConnect: () => void
}

export const Component = (props: Props) => {
    return (
        <MainLayout.Component>
            <Stack>
                <Item>
                    <Typography variant="h2" component="div" gutterBottom>
                        ZKDP - ZK Door on Polygon
                    </Typography>
                    <Typography variant="h3" component="div" gutterBottom>
                        Proof of Concept - NFT Ticketing & ZKP
                    </Typography>
                    <Typography variant="h5" component="div" gutterBottom>
                        🦄You can join some NFT holder limited events without
                        revealing your address🦄
                    </Typography>
                </Item>
                <Item sx={{ textAlign: 'left' }}>
                    <Box
                        sx={{
                            paddingTop: 5,
                            paddingBottom: 5,
                            paddingRight: 18,
                            paddingLeft: 18
                        }}
                    >
                        <Typography variant="h4" component="div" gutterBottom>
                            ✅ Verify your wallet address
                        </Typography>
                        <Typography variant="h4" component="div" gutterBottom>
                            ✅ Verify your NFT ownership
                        </Typography>
                        <Typography variant="h4" component="div" gutterBottom>
                            ✅ Generate Zero Knowledge Proof
                        </Typography>
                        <Typography variant="h4" component="div" gutterBottom>
                            ✅ Verify without revealing your wallet
                            address🌈🌈🌈
                        </Typography>
                    </Box>
                </Item>
                <Item>
                    <Button onClick={props.onClickConnect}>
                        SIGNIN WITH METAMASK
                    </Button>
                </Item>
            </Stack>
        </MainLayout.Component>
    )
}
