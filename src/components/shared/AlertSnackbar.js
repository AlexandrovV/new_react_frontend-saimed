import React, { useEffect } from 'react'
import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

const AlertSnackbar = props => {
    const { open, handleClose, message, severity } = props

    useEffect(() => {
        console.log(open)
    }, [])

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert elevation={6} variant="filled" onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default AlertSnackbar