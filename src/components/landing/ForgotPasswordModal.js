import React, { useContext } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { TextField, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AuthService from '../../service/AuthService'
import { useHistory } from "react-router-dom"
import { AlertContext } from '../../context/AlertContext'

const useStyles = makeStyles({
    dialogTitle: {
        textAlign: 'center'
    }
})

const ForgotPasswordModal = props => {
    const history = useHistory()
    const { showSuccess, showError } = useContext(AlertContext)

    const [email, setEmail] = React.useState('');

    const classes = useStyles()

    const { open, onClose, openLoginModal } = props

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const result = await AuthService.forgotPassword(email)
            if (result) {
                showSuccess('Ссылка для восстановления пароля была отправлена вам на почту!')
            } else {
                showError('При восстановлении пароля произошла ошибка')
            }
            onClose()
        } catch (err) {
            showError(err)
        }
    }

    const openLogin = () => {
        onClose()
        openLoginModal()
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>Восстановление пароля:</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Ваш E-mail"
                        type="text"
                        fullWidth
                        onChange={e => setEmail(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={openLogin} color="primary">
                        Вспомнили?
                    </Button>
                    <Button  type="submit" color="primary" variant="contained">
                        Напомнить
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}


export default ForgotPasswordModal