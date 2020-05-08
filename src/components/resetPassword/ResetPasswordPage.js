import React, {useContext, useState, Fragment, useEffect} from 'react'
import {
    Container,
    Grid,
    TextField,
    Button,
    Typography
} from '@material-ui/core'
import {useHistory, useLocation} from 'react-router-dom'
import {AlertContext} from '../../context/AlertContext'
import AuthService from '../../service/AuthService'
import {makeStyles} from '@material-ui/styles'
import ResetPasswordAppBar from "./ResetPasswordAppBar";
import queryString from 'query-string'
import DoctorService from "../../service/DoctorService";

const useStyles = makeStyles({
    container: {
        paddingTop: '50px',
        paddingBottom: '50px'
    },
    buttonStyle: {
        marginTop: '15px'
    }
})

const ResetPasswordPage = props => {
    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()
    const {showSuccess, showError} = useContext(AlertContext)

    const [email, setEmail] = useState('someemail@email.com');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const resetToken = queryString.parse(location.search).token

    const fetchData = async () => {
        try {
            const email = await AuthService.confirmReset(resetToken)
            setEmail(email)
        } catch (err) {
            showError(err)
        }
    }

    useEffect(() => {
        if (!resetToken) {
            history.push('/')
            showError('Ссылка на восстановление пароля больше не действительна!')
            // TODO maybe handle another way
        } else {
            fetchData()
        }
    }, [])

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const token = await AuthService.resetPassword(resetToken, password, passwordConfirmation)
            showSuccess('Пароль успешно изменен!')
            history.push('/')
        } catch (err) {
            showError(err)
        }
    }

    return (
        <Fragment>
            <ResetPasswordAppBar/>
            <Container className={classes.container}>
                <Grid container>
                    <Grid item md={"4"}>
                        <Typography gutterBottom variant="h5" component="h2" >
                            Восстановление пароля
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                margin="dense"
                                value={email}
                                label="Ваш E-mail"
                                type="text"
                                variant="outlined"
                                disabled
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                label="Новый пароль"
                                type="password"
                                variant="outlined"
                                fullWidth
                                onChange={e => setPassword(e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="Подтверждение пароля"
                                type="password"
                                variant="outlined"
                                fullWidth
                                onChange={e => setPasswordConfirmation(e.target.value)}
                            />
                            <Button type="submit" variant="contained" color="primary" className={classes.buttonStyle}>
                                Сменить пароль
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    )
}

export default ResetPasswordPage