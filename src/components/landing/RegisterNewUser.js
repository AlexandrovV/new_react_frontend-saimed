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
import InputMask from "react-input-mask";

const useStyles = makeStyles({
    dialogTitle: {
        textAlign: 'center'
    }
})

const RegisterNewUser = props => {
    const history = useHistory()
    const { showError, showSuccess } = useContext(AlertContext)

    const { open, onClose,fetchData } = props
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [passwordConfirm, setPasswordConfirm] = React.useState('');

    const [fullName, setFullName] = React.useState('');

    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [birthDate, setBirthDate] = React.useState(null);
    const [iin,setIin]=React.useState('');


    const classes = useStyles()

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const token = await AuthService.register(email, password,passwordConfirm,fullName,phoneNumber,birthDate, iin)
            showSuccess('Пользователь успешно зарегистрирован!')
            fetchData()
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
                <InputMask mask="+7 (999) 999-99-99" maskChar=" " onChange={e => setPhoneNumber(e.target.value)}>
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
                    onChange={e => setIin(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Полное имя"
                    fullWidth
                    onChange={e => setFullName(e.target.value)}
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
                <TextField
                    margin="dense"
                    label="E-mail (необязательно)"
                    type="text"
                    fullWidth
                    onChange={e => setEmail(e.target.value)}
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

  
export default RegisterNewUser