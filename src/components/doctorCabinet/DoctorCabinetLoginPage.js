import React, { useContext, useState } from 'react'
import { Container, Grid, TextField, Button, CardHeader, CardContent, CardActions, Card, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { AlertContext } from '../../context/AlertContext'
import AuthService from '../../service/AuthService'
import { makeStyles } from '@material-ui/styles'
import InputMask from "react-input-mask";

const useStyles = makeStyles({
    container: {
        paddingTop: '50px',
        paddingBottom: '50px'
    },
    textCenter: {
        textAlign: 'center'
    },
})

const DoctorCabinetLoginPage = () => {
    const classes = useStyles()
    const history = useHistory()
    const { showError } = useContext(AlertContext)

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const token = await AuthService.login(login, password)
            localStorage.setItem('token', token)
            history.push('/admin')
        } catch (err) {
            showError(err)
        }
    }

    return (
        <Container className={classes.container}>
            <Grid container justify="center" >
                <Grid item>
                    <Card>
                        <form onSubmit={handleSubmit}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2" className={classes.textCenter}>
                                Вход
                            </Typography>
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
                        </CardContent>
                        <CardActions>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Button type="submit" variant="contained" color="primary">
                                        Войти
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardActions>
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default DoctorCabinetLoginPage