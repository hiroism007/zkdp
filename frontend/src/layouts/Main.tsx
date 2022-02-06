import * as React from 'react'
import Container from '@mui/material/Container'
import * as Header from '~/components/Header'

type Props = {
    children: React.ReactNode
}

export const Component = (props: Props) => {
    return (
        <div>
            <Header.Component></Header.Component>
            <Container sx={{ alignItems: 'center' }}>
                {props.children}
            </Container>
        </div>
    )
}
