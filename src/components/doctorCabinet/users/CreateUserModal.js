import React, { useContext } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { TextField, Button, Snackbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AuthService from '../../../service/AuthService'
import { AlertContext } from '../../../context/AlertContext'

const useStyles = makeStyles({
    dialogTitle: {
        textAlign: 'center'
    }
})

const CreateUserModal = props => {
    const { showError, showSuccess } = useContext(AlertContext)

    const { open, onClose, onCreate } = props
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [passwordConfirm, setPasswordConfirm] = React.useState('');

    const [fullName, setFullName] = React.useState('');

    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [birthDate, setBirthDate] = React.useState(null);


    const classes = useStyles()

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await AuthService.register(email, password, passwordConfirm, fullName, phoneNumber, birthDate)
            showSuccess('Пользователь успешно зарегистрирован!')
            onCreate()
            onClose()
        } catch (err) {
            showError(err)
        }
    }

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>Регистрация</DialogTitle>
            <form onSubmit={handleSubmit}>
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
                    <TextField
                        margin="dense"
                        label="Потвердите пароль"
                        type="password"
                        fullWidth
                        onChange={e => setPasswordConfirm(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Полное имя"
                        fullWidth
                        onChange={e => setFullName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Номер телефона"
                        fullWidth
                        type="tel"
                        onChange={e => setPhoneNumber(e.target.value)}
                    />
                    <TextField
                        id="standard-full-width"
                        label="Дата рождения"
                        type="date"
                        fullWidth
                        margin="dense"
                        onChange={e => setBirthDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Отмена
                    </Button>
                    <Button  type="submit" color="primary" variant="contained">
                        Зарегистрировать пользователя
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}


export default CreateUserModal