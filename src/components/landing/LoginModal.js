import React, { useContext } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { TextField, Button, Snackbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AuthService from '../../service/AuthService'
import { useHistory } from "react-router-dom"
import { AlertContext } from '../../context/AlertContext'
import InputMask from "react-input-mask";

const useStyles = makeStyles({
    dialogTitle: {
        textAlign: 'center'
    },
    forgotPassword: {
        color: '#2978A0',
        textAlign: 'right',
        cursor: "pointer",
        size: '10pt',
        "&:hover": {
            textDecoration: 'underline',
        }
    }
})

const LoginModal = props => {
    const history = useHistory()
    const { showError } = useContext(AlertContext)

    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    const classes = useStyles()

    const { open, onClose, openRegisterModal, openForgotPasswordModal } = props

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const token = await AuthService.login(login, password)
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

    const openForgotPassword = () => {
        onClose()
        openForgotPasswordModal()
    }
    
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>Войти в кабинет</DialogTitle>
            <form onSubmit={handleSubmit}>
            <DialogContent>
                <InputMask mask="+7 (999) 999-99-99" maskChar=" " onChange={e => setLogin(e.target.value)}>
                    { (inputProps) =>
                        <TextField
                            {...inputProps}
                            margin="dense"
                            label="Номер телефона"
                            type="text"
                            fullWidth
                        />
                    }
                </InputMask>
                <TextField
                    margin="dense"
                    label="Пароль"
                    type="password"
                    fullWidth
                    onChange={e => setPassword(e.target.value)}
                />
                <Typography onClick={openForgotPassword} className={classes.forgotPassword}>Забыли пароль?</Typography>
            </DialogContent>
            <DialogActions>
            <Button onClick={openRegistration} color="primary">
                Зарегистрироваться
            </Button>
            <Button  type="submit" color="primary" variant="contained">
                Войти
            </Button>
         </DialogActions>
            </form>
        </Dialog>
    )
}

  
export default LoginModal