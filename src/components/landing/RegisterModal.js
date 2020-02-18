import React, { useContext } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { TextField, Button, Snackbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AuthService from '../../service/AuthService'
import { useHistory } from "react-router-dom"
import Alert from '@material-ui/lab/Alert';
import { AlertContext } from '../../context/AlertContext'

const useStyles = makeStyles({
    dialogTitle: {
        textAlign: 'center'
    }
})

const RegisterModal = props => {
    const history = useHistory()
    const { showError, showSuccess } = useContext(AlertContext)

    const { open, onClose } = props
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const classes = useStyles()

    const handleSubmit = async () => {
        try {
            const token = await AuthService.register(email, password)

            localStorage.setItem('token', token)
            history.push('/cabinet')
            showSuccess('Пользователь успешно зарегистрирован!')
        } catch (err) {
            showError(err)
        }
    }
    
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>Регистрация</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="E-mail"
                    type="text"
                    fullWidth
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Пароль"
                    type="password"
                    fullWidth
                    onChange={e => setPassword(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
            <Button onClick={onClose} color="primary">
                Отмена
            </Button>
            <Button onClick={handleSubmit} color="primary">
                Зарегистрироваться
            </Button>
         </DialogActions>
        </Dialog>
    )
}

  
export default RegisterModal