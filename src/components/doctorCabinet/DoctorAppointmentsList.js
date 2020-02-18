import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import DoctorFutureAppointmentItem from "./DoctorFutureAppointmentItem";
import DoctorPastAppointmentItem from "./DoctorPastAppointmentItem";
import DoctorService from "../../service/DoctorService";

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

const DoctorAppointmentsList = props => {
    const classes = useStyles()
    const [futureAppointments, setFutureAppointments] = useState([])
    const [pastAppointments, setPastAppointments] = useState([])
    
    const fetchData = async () => {
        try {
            const data = await DoctorService.todayAppointments()
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
            <Typography className={classes.subheading}>Записи:</Typography>
            <Grid container spacing={1}>
                {
                    futureAppointments.length > 0 ? futureAppointments.map(a =>
                        <Grid item xs={12} key={a.id}>
                            <DoctorFutureAppointmentItem 
                                date={a.date} 
                                startTime={a.startTime}
                                endTime={a.endTime} 
                                appointmentId={a.appointmentId} 
                                userId={a.userId}
                                patientName={a.patientName}
                                patientPhoneNumber={a.patientPhoneNumber}
                                patientBirthDate={a.patientBirthDate}
                                onCancel={fetchData}
                                onSaveMedicalReport={fetchData}
                            />
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
                            <DoctorPastAppointmentItem 
                                date={a.date} 
                                startTime={a.startTime} 
                                endTime={a.endTime} 
                                appointmentId={a.appointmentId} 
                            />
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

export default DoctorAppointmentsList