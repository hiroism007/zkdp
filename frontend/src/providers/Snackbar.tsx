import * as React from 'react'
import { Snackbar, Alert, SnackbarOrigin, AlertTitle } from '@mui/material'
import { AlertColor } from '@mui/material/Alert/Alert'

type Props = {
    children: React.ReactNode
}

type SnackbarDispatchProps = {
    anchorOrigin: SnackbarOrigin
    open: boolean
    autoHideDuration?: number
    onClose?: () => void
    message: string
    severity: AlertColor
    title?: string
}

type SnackbarContextType = {
    dispatchSnackbar: (props: SnackbarDispatchProps) => void
    dispatchNotification: (
        props: Pick<
            SnackbarDispatchProps,
            'autoHideDuration' | 'message' | 'severity' | 'title'
        >
    ) => void
}

const defaultState: SnackbarDispatchProps = {
    anchorOrigin: {
        horizontal: 'center',
        vertical: 'top'
    },
    open: false,
    message: 'hello noti',
    severity: 'info',
    title: 'info'
}

export const SnackbarContext = React.createContext<SnackbarContextType>({
    dispatchSnackbar: () => {},
    dispatchNotification: () => {}
})

export const SnackbarProvider = ({ children }: Props) => {
    const [state, setState] = React.useState<SnackbarDispatchProps | null>(null)

    const onClose = React.useCallback(() => {
        if (!state) return
        if (state.onClose) state.onClose()
        setState(null)
    }, [state])

    const Snack = React.useMemo(() => {
        if (!state) return
        return (
            <Snackbar
                anchorOrigin={state.anchorOrigin}
                open={state.open}
                onClose={onClose}
                autoHideDuration={state.autoHideDuration}
            >
                <Alert onClose={onClose} severity={state.severity}>
                    <AlertTitle>
                        {state.title ? state.title : state.severity}
                    </AlertTitle>
                    {state.message}
                </Alert>
            </Snackbar>
        )
    }, [onClose, state])

    const dispatchSnackbar = (props: SnackbarDispatchProps) => {
        setState({ ...props })
    }

    const dispatchNotification = (
        props: Pick<
            SnackbarDispatchProps,
            'autoHideDuration' | 'message' | 'severity' | 'title'
        >
    ) => {
        setState({
            ...defaultState,
            open: true,
            autoHideDuration: props.autoHideDuration,
            message: props.message,
            severity: props.severity,
            title: props.title || defaultState.title
        })
    }

    return (
        <SnackbarContext.Provider
            value={{ dispatchSnackbar, dispatchNotification }}
        >
            {Snack}
            {children}
        </SnackbarContext.Provider>
    )
}
