import React, { useState } from "react";
import { Grid, Typography, Button, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import dateFormat from 'dateformat'
import MedicalReportModal from "./MedicalReportModal";

const useStyles = makeStyles(theme => ({
    appointmentContainer: {
        padding: '15px'
    }
}))

const DoctorPastAppointmentItem = props => {
    const classes = useStyles()
    const [medicalReportOpen, setMedicalReportOpen] = useState(false)

    const { date, startTime, endTime, appointmentId, onCancel } = props

    const openMedicalReport = () => setMedicalReportOpen(true)
    const closeMedicalReport = () => setMedicalReportOpen(false)

    return (
        <Card  className={classes.appointmentContainer}>
            <Grid container spacing={3} justify="space-between" alignItems="center"> 
                <Grid item>
                    <Typography>{dateFormat(date, 'dddd dd mmmm')}, {dateFormat(startTime, 'HH:MM')} - {dateFormat(endTime, 'HH:MM')}</Typography>
                </Grid>
                <Grid item>
                    <Button variant="outlined" onClick={openMedicalReport}>Заключение</Button>
                </Grid>
            </Grid>
            <MedicalReportModal
                open={medicalReportOpen}
                onClose={closeMedicalReport}
                appointmentId={appointmentId}
            />
        </Card>
    );
};

export default DoctorPastAppointmentItem;



