import * as React from 'react'
import * as VerifyTemplate from '~/templates/Verify'
import * as firebase from '~/modules/firebase'
import axios from 'axios'

const db = firebase.app.firestore()

export const Component = () => {
    const [verified, setVerified] = React.useState<undefined | boolean>(
        undefined
    )
    const [snackOpen, setSnackOpen] = React.useState<boolean>(false)
    const [message, setMessage] = React.useState<string>('')
    const [showReader, setShowReader] = React.useState<boolean>(true)
    const onCloseMessage = React.useCallback(() => {
        setSnackOpen(false)
        setMessage('')
    }, [])
    const [loading, setLoading] = React.useState<boolean>(false)

    const onReadProof = React.useCallback(async (proof: string | null) => {
        if (!proof) return
        setLoading(true)

        try {
            const snapshot = await db.collection('proofs').doc(proof).get()
            if (!snapshot.exists) {
                setLoading(false)
                setMessage('Proof Not Found')
                setSnackOpen(true)
            }

            const proofs = JSON.parse(snapshot.get('jsonStr'))
            const response = await axios.post(
                'https://api-duf34by2za-uw.a.run.app/verify',
                proofs
            )
            setLoading(false)
            if (response.data.result) {
                setShowReader(false)
                setMessage('Verified!!')
                setSnackOpen(true)
                setVerified(true)
            } else {
                setShowReader(false)
                setMessage('Verification Failed!!')
                setSnackOpen(true)
                setVerified(false)
            }
        } catch (e) {
            console.error(e)
            setLoading(false)
        }
    }, [])

    return (
        <VerifyTemplate.Component
            verified={verified}
            showReader={showReader}
            loading={loading}
            snackOpen={snackOpen}
            message={message}
            onCloseMessage={onCloseMessage}
            onChange={onReadProof}
        />
    )
}
