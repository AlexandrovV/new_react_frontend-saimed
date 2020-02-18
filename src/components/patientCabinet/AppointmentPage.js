import React, { useState, useEffect } from 'react';
import { Button, List, ListItem, Grid, Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { DatePicker } from '@material-ui/pickers';
import PatientService from '../../service/PatientService';
import dateFormat from 'dateformat'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
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
})

const AppointmentPage = props => {
    const [selectedDate, handleDateChange] = useState(new Date())
    const [availableAppointments, setAvailableAppointments] = useState([])
    const [selectedTime, setSelectedTime] = useState(null)
 
    const classes = useStyles()
    const history = useHistory()

    const fetchData = async () => {
        try {
            const appointments = await PatientService.getAppointmentsByDate(selectedDate)
            setAvailableAppointments(appointments.filter(a => a.status == 'FREE'))
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [selectedDate])

    const makeAppointment = async () => {
        try {
            console.log('makeAppointment')
            await PatientService.makeAppointment(selectedTime)
            history.push('/cabinet')
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Container className={classes.container}>
            <Grid container spacing={4} justify="space-around">
                <Grid item xs={12}  md={6}>
                    <Typography className={classes.subheading}>Выберите дату:</Typography>
                    <DatePicker value={selectedDate} 
                        autoOk
                        disablePast
                        orientation="landscape"
                        variant="static"
                        openTo="date"
                        onChange={handleDateChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography className={classes.subheading}>Выберите время:</Typography>
                    <List>
                        {
                            availableAppointments.length > 0 ? availableAppointments.map(a => 
                                <ListItem key={a.id}>
                                    <Button 
                                        variant={selectedTime === a.id ? "contained" : "outlined"} 
                                        color={selectedTime === a.id ? "primary" : "default"} 
                                        onClick={e => setSelectedTime(a.id)}>
                                        {dateFormat(a.startTime, 'HH:MM')} - {dateFormat(a.endTime, 'HH:MM')}
                                    </Button>
                                </ListItem>
                            ) : 
                            <ListItem>На этот день свободных записей нет</ListItem>
                        }
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