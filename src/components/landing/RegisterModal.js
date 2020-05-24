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
import MaskedInput from 'react-text-mask'
const useStyles = makeStyles({
    dialogTitle: {
        textAlign: 'center'
    }
})
const TextMaskCustom = (props) => {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={inputRef}
            mask={'(XXX) XXX-XX-XX'}
            showMask
        />
    );
}
const RegisterModal = props => {
    const history = useHistory()
    const { showError, showSuccess } = useContext(AlertContext)

    const { open, onClose } = props
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [passwordConfirm, setPasswordConfirm] = React.useState('');

    const [fullName, setFullName] = React.useState('');

    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [birthDate, setBirthDate] = React.useState(null);
    const [iin,SetIin]=React.useState('');

    const classes = useStyles()

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const token = await AuthService.register(login, password,passwordConfirm,fullName,phoneNumber,birthDate,iin)
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
            <form onSubmit={handleSubmit}>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Login"
                    type="text"
                    fullWidth
                    onChange={e => setLogin(e.target.value)}
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
                    label="ИИН"
                    fullWidth
                    maxlength={12}
                    onChange={e => SetIin(e.target.value)}
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
                    maxlength={10}
                    minlength ={10}
                    onChange={e => setPhoneNumber(e.target.value)}
                >

                </TextField>
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
                Зарегистрироваться
            </Button>
         </DialogActions>
        </form>
        </Dialog>
    )
}

  
export default RegisterModal