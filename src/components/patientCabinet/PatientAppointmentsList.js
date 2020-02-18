import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import FutureAppointmentItem from "./FutureAppointmentItem";
import PastAppointmentItem from "./PastAppointmentItem";
import PatientService from "../../service/PatientService";

const useStyles = makeStyles(theme => ({
    subheading: {
        fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';",
        fontSize: '20px',
        marginTop: '20px',
        marginBottom: '10px'
    },
    emptyAppointments: {
        padding: '20px',
        marginBottom: '10px'
    }
}))

const PatientAppointmentsList = props => {
    const classes = useStyles()
    const [futureAppointments, setFutureAppointments] = useState([])
    const [pastAppointments, setPastAppointments] = useState([])

    const fetchData = async () => {
        try {
            const data = await PatientService.getMyAppointments()
            setFutureAppointments(
                data.filter(a => a.status != 'FINISHED')
            )
            setPastAppointments(
                data.filter(a => a.status == 'FINISHED')
            )
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Container>
            <Typography className={classes.subheading}>Ваши записи:</Typography>
            <Grid container spacing={1}>
                {
                    futureAppointments.length > 0 ?   
                    futureAppointments.map(a =>
                        <Grid item xs={12} key={a.id}>
                            <FutureAppointmentItem date={a.date} startTime={a.startTime} endTime={a.endTime} appointmentId={a.id} onCancel={fetchData}/>
                        </Grid>
                    ) :

                    <Grid item xs={12}>
                        <Card className={classes.emptyAppointments}>
                            <Typography>На данный момент у вас нет записей</Typography>
                        </Card>
                    </Grid>
                }
            </Grid>
            <Typography className={classes.subheading}>Прошлые приёмы:</Typography>
            <Grid container spacing={2}>
                {
                    pastAppointments.length > 0 ? pastAppointments.map(a =>
                        <Grid item xs={12} key={a.id}>
                            <PastAppointmentItem date={a.date} startTime={a.startTime} endTime={a.endTime} appointmentId={a.id} />
                        </Grid>
                    ) :
                    <Grid item xs={12}>
                        <Card className={classes.emptyAppointments}>
                            <Typography>У вас нет прошедших приёмов</Typography>
                        </Card>
                    </Grid>
                }
            </Grid>
            
        </Container>
    )
}

export default PatientAppointmentsList