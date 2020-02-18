import React, { useContext } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { TextField, Button, Snackbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AuthService from '../../service/AuthService'
import { useHistory } from "react-router-dom"
import { AlertContext } from '../../context/AlertContext'

const useStyles = makeStyles({
    dialogTitle: {
        textAlign: 'center'
    }
})

const LoginModal = props => {
    const history = useHistory()
    const { showError } = useContext(AlertContext)

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    const classes = useStyles()

    const { open, onClose, openRegisterModal } = props

    const handleSubmit = async () => {
        try {
            const token = await AuthService.login(email, password)
            localStorage.setItem('token', token)
            history.push('/cabinet')
        } catch (err) {
            showError(err)
        }
    }

    const openRegistration = () => {
        onClose()
        openRegisterModal()
    }
    
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>Войти в кабинет</DialogTitle>
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
                
            <Button onClick={openRegistration} color="primary">
                Зарегистрироваться
            </Button>
            <Button onClick={handleSubmit} color="primary">
                Войти
            </Button>
         </DialogActions>
     
        </Dialog>
    )
}

  
export default LoginModal