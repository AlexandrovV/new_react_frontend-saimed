import React, {useState, useEffect, useContext} from 'react';
import { Button, List, ListItem, Grid, Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { DatePicker } from '@material-ui/pickers';
import PatientService from '../../service/PatientService';
import dateFormat from 'dateformat'
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {AlertContext} from "../../context/AlertContext";

const useStyles = makeStyles(theme => ({
    subheading: {
        fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';",
        fontSize: '20px',
        marginTop: '20px',
        marginBottom: '10px'
    },
    container: {
        marginTop: '20px',
        marginBottom: '20px'
    },
    for_phone:{
        display:'none',
        [theme.breakpoints.down('xs')]: {
            display:'inline',
        },
    },
    for_pc:{
        display:'none',
        [theme.breakpoints.down('xs')]: {
            display:'none',
        },
    }
}))

const AppointmentPage = props => {
    const { showError, showSuccess } = useContext(AlertContext)

    const [selectedDate, handleDateChange] = useState(new Date())
    const [availableAppointments, setAvailableAppointments] = useState([])
    const [selectedTime, setSelectedTime] = useState(null)
    const [orientate,setOrientate] = useState('landscape')
    const classes = useStyles()
    const history = useHistory()
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'));
    const fetchData = async () => {
        try {
            const appointments = await PatientService.getAppointmentsByDate(selectedDate)
            setAvailableAppointments(appointments.filter(a => a.status === 'FREE'))
            if(matches)
                setOrientate('portrait');
        } catch (err) {
            showError(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [selectedDate])

    const makeAppointment = async () => {
        try {
            await PatientService.makeAppointment(selectedTime)
            showSuccess('Вы успешно записались на прием!')
            history.push('/cabinet')
        } catch (err) {
            showError(err)
        }
    }


    return (
        <Container className={classes.container}>
            <Grid container spacing={4} justify="space-around">
                <Grid item xs={12} md={6} justify="center">
                    <Typography className={classes.subheading}>Выберите дату:</Typography>
                    <DatePicker value={selectedDate} 
                        autoOk
                        variant={matches? "dialog":"static"}
                        disablePast
                        inputVariant="outlined"
                        orientation={matches? "portrait":"landscape"}
                        openTo="date"
                        onChange={handleDateChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography className={classes.subheading}>Выберите время:</Typography>
                    <List>
                        <Grid container xs={12}>
                        {
                                availableAppointments.length > 0 ? availableAppointments.map(a =>
                                <Grid item xs={6}>
                                    <ListItem key={a.id}>
                                        <Button
                                            variant={selectedTime === a.id ? "contained" : "outlined"}
                                            color={selectedTime === a.id ? "primary" : "default"}
                                            onClick={e => setSelectedTime(a.id)}>
                                            {dateFormat(a.startTime, 'HH:MM')} - {dateFormat(a.endTime, 'HH:MM')}
                                        </Button>
                                    </ListItem>
                                </Grid>
                                ) :
                                <ListItem>На этот день свободных записей нет</ListItem>
                        }

                        </Grid>
                    </List>
                </Grid>
                <Grid item xs={12} style={{textAlign:'center'}}>
                    <Button onClick={makeAppointment} variant="contained" color="primary" disabled={selectedTime===null}>
                        Записаться
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default AppointmentPage