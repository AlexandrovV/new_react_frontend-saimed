import React, { useContext, useState } from 'react'
import { Container, Grid, TextField, Button, CardHeader, CardContent, CardActions, Card, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { AlertContext } from '../../context/AlertContext'
import AuthService from '../../service/AuthService'
import { makeStyles } from '@material-ui/styles'

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

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        try {
            const token = await AuthService.login(email, password)
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
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2" className={classes.textCenter}>
                                Вход
                            </Typography>
                    
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
                        </CardContent>
                        <CardActions>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Button onClick={handleSubmit} variant="contained" color="primary">
                                        Войти
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardActions>
                        
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default DoctorCabinetLoginPage