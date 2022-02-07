import * as React from 'react'
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useContext } from 'react'
import { MetaMaskContext } from '~providers/MetaMask'
import * as ReactRouter from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person'
import SecurityIcon from '@mui/icons-material/Security'
import { Settings } from '@mui/icons-material'

type Props = {}

export const Component = (_props: Props) => {
    const [state, setState] = React.useState(false)

    const toggleDrawer =
        (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return
            }
            setState(open)
        }

    const list = () => (
        <Box
            sx={{
                width: 250
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
        >
            <List>
                {['PROVER', 'VERIFIER'].map((text, index) => {
                    let ICON, fn
                    if (index === 0) {
                        ICON = <PersonIcon />
                        fn = () => {
                            history.push('/')
                        }
                    } else {
                        fn = () => {
                            history.push('/verify')
                        }
                        ICON = <SecurityIcon />
                    }
                    return (
                        <ListItem button key={text} onClick={fn}>
                            <ListItemIcon>{ICON}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    )

    const history = ReactRouter.useHistory()
    const { address } = useContext(MetaMaskContext)

    const headerTitle = 'ZKDP'
    return (
        <Box sx={{ flexGrow: 1, background: '#8248e5' }}>
            <AppBar position="sticky" sx={{ background: '#8248e5' }}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'block', sm: 'block' } }}
                    >
                        {headerTitle}
                    </Typography>
                    {address && (
                        <>
                            <Box sx={{ flexGrow: 1 }} />
                            <Box sx={{ display: { xs: 'block', md: 'flex' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="show 17 new notifications"
                                    color="inherit"
                                    onClick={toggleDrawer(true)}
                                >
                                    <Settings />
                                </IconButton>
                            </Box>
                            <Drawer
                                anchor={'right'}
                                open={state}
                                onClose={toggleDrawer(false)}
                            >
                                {list()}
                            </Drawer>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
}
