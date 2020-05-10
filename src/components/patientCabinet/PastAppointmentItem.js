import React, { useState } from "react";
import { Grid, Typography, Button, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import dateFormat from 'dateformat'
import Fab from '@material-ui/core/Fab';
import MedicalReportModal from "./MedicalReportModal";
import DescriptionIcon from "@material-ui/icons/Description";
import { useEffect } from 'react';

const useStyles = makeStyles(theme => ({
    appointmentContainer: {
        paddingTop: '15px',
        paddingBottom:'15px',
        paddingLeft:'15px',
        marginBottom: '10px'
    },
    IconEditSize:{
        width:"3vh",
        height:"5vh",
        [theme.breakpoints.up('xl')]:{
          height:"2vh",
          fontSize:"1vw"
        },
      },
      font_for_typography:{
        fontSize:"1.3vw",
        [theme.breakpoints.between('xs','sm')]:{
          fontSize:"1.8vw",
        },
        [theme.breakpoints.down('xs')]: {
          fontSize:"2vh",
        },
      },
    fabDescription: {
        backgroundColor: "#1c8045",
        color: "white",
        height: "5vh",
        fontSize: "1.3vw",
        width: "100%",
        "&:hover": {
          backgroundColor: "white",
          color: "#1c8045"
        },
        [theme.breakpoints.down("xs")]: {
          display: "none"
        },
        [theme.breakpoints.up('xl')]:{
            height:"4vh",
            fontSize:"1vw"
        },
      },
      fabDescIcon: {
        display: "none",
        backgroundColor: "#1c8045",
        color: "white",
        "&:hover": {
          backgroundColor: "white",
          color: "#1c8045"
        },
        [theme.breakpoints.down("xs")]: {
            display: "inline",
            fontSize:'1.5vw'
        }
      },

}))

const PastAppointmentItem = props => {
    const classes = useStyles()
    const [medicalReportOpen, setMedicalReportOpen] = useState(false)
    const { date, startTime, endTime, appointmentId, onCancel } = props

    const openMedicalReport = () => setMedicalReportOpen(true)
    const closeMedicalReport = () => setMedicalReportOpen(false)
    
    

    return (
        <Card  className={classes.appointmentContainer}>
            <Grid container spacing={3} justify="space-between" alignItems="center"> 
                <Grid item xs={6} md={6} xl={6}>
                    <Typography variant="h6" className={classes.font_for_typography}>
                        {/*{dateFormat(date.replace(' ','T'), 'dddd dd mmmm')}, {dateFormat(startTime.replace(' ','T'), 'HH:MM')} - {dateFormat(endTime.replace(' ','T'), 'HH:MM')}*/}
                    </Typography>
                </Grid>
                <Grid item  xs={4} md={2} xl={3}>
                  <Fab  variant="extended" className={classes.fabDescription} onClick={openMedicalReport}>
                     <DescriptionIcon className={classes.IconEditSize}/>
                     Заключение
                    </Fab>
                    <Fab  className={classes.fabDescIcon} onClick={openMedicalReport}>
                    <DescriptionIcon />
                      Заключение
                    </Fab>
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

export default PastAppointmentItem;
