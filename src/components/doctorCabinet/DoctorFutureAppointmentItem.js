import React, { useContext, useState } from "react";
import { Grid, Typography, Button, Card } from "@material-ui/core";
import { makeStyles,useTheme } from "@material-ui/styles";
import { useEffect } from 'react';
import dateFormat from 'dateformat'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DoctorService from "../../service/DoctorService";
import { AlertContext } from "../../context/AlertContext";
import AppointmentDetailModal from "./AppointmentDetailsModal";
import SaveMedicalReportModal from "./SaveMedicalReportModal";
import MedicalReportModal from "./MedicalReportModal";
import IsNewUserModal from "../landing/IsNewUserModal";
import RegisterModal from '../landing/RegisterModal'
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import { green, blue, red, yellow } from '@material-ui/core/colors';
import DescriptionIcon from "@material-ui/icons/Description";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles(theme => ({
    appointmentContainer: {
        padding: '15px',
        marginBottom: '10px'
    },
    IconEditSize:{
        width:"3vh",
        height:"5vh",
      },
      IconSize:{
        width:"3vh",
        height:"5vh",
      },
      fabEdit:{
        backgroundColor:"#3897ba",
        color:"white",
        height:"5vh",
        fontSize:"1.5vw",
        width:'100%',
        '&:hover':{
          backgroundColor:"white",
          color:"#3897ba"
        },
        [theme.breakpoints.down('xs')]: {
          display:'none',
        }
      },
      fabDelete:{
        backgroundColor:red[900],
        width:'100%',
        height:"5vh",
        fontSize:"1.3vw",
        color:"white",
        '&:hover':{
          backgroundColor:"white",
          color:red[500]
        },
        [theme.breakpoints.down('xs')]: {
          display:'none',
        }
      },
      fabDelIcon:{
        backgroundColor:red[900],
        color:"white",
        display:'none',
       '&:hover':{
          backgroundColor:"white",
          color:red[500]
        },
        [theme.breakpoints.down('xs')]: {
          display:'inline',
          fontSize:'1.8vw',
          
        },
      },
      fabEdIcon:{
        backgroundColor:"#3897ba",
        display:'none',
        color:'white',
        '&:hover':{
          backgroundColor:"white",
          color:"#3897ba"
        },
        [theme.breakpoints.down('xs')]: {
          display:'inline',
          fontSize:'1.8vw'
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
        }
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
          fontSize:'1.8vw'
        }
      },
      fabCheckCircle: {
        backgroundColor: "purple",
        color: "white",
        height: "5vh",
        fontSize: "1.3vw",
        width: "100%",
        "&:hover": {
          backgroundColor: "white",
          color: "purple"
        },
        [theme.breakpoints.down("xs")]: {
          display: "none"
        }
      },
      fabCheckIcon: {
        display: "none",
        backgroundColor: "purple",
        color: "white",
        "&:hover": {
          backgroundColor: "white",
          color: "purple"
        },
        [theme.breakpoints.down("xs")]: {
          display: "inline",
          fontSize:'1.8vw'

        }
      },
}))

const DoctorFutureAppointmentItem = props => {
    const classes = useStyles()
    const theme = useTheme()
    const { showError, showSuccess } = useContext(AlertContext)

    const [detailsOpen, setDetailsOpen] = useState(false)
    const [medicalReportOpen, setMedicalReportOpen] = useState(false)
    const [IsNewUserModalOpen, setIsNewUserModalOpen] = React.useState(false)
    const [registerModalOpen, setRegisterModalOpen] = React.useState(false)
    const [directionType,setDirectionType] = React.useState('row');
    const matches = useMediaQuery(theme.breakpoints.down('xs'));

    const openRegisterModal = () => setRegisterModalOpen(true)
    const closeRegisterModal = () => setRegisterModalOpen(false)

    const openModal=()=>{
        setIsNewUserModalOpen(true);
    }
    const CloseModal=()=>{
        setIsNewUserModalOpen(false);
    }
    useEffect(() => {    
        if(matches)
            setDirectionType('column')
        else
            setDirectionType('row')
    })
    const { onSaveMedicalReport, date, startTime, endTime, appointmentId, onCancel, userId, patientName, patientPhoneNumber, patientBirthDate } = props

    console.log(appointmentId)

    const cancelAppointment = async () => {
        try {
            await DoctorService.cancelAppointment(appointmentId)
            onCancel()
            showSuccess('Запись успешно отменена!')
        } catch (err) {
            showError(err)
        }
    }

    const showDetails = () => { setDetailsOpen(true) }
    const showMedicalReport = () => { setMedicalReportOpen(true) }

    return (
        <Card  className={classes.appointmentContainer}>
               <Grid container spacing={3} justify="flex-start" alignItems="center">                    
                <Grid item xs={6}>
                <Typography>
                  {dateFormat(date, 'dddd dd mmmm')}, {dateFormat(startTime, 'HH:MM')} - {dateFormat(endTime, 'HH:MM')}
                  </Typography>
                </Grid> 
                {userId ? 
                <Grid item xs={6}>
                        <Grid container direction={directionType} justify="space-evenly" alignItems="center" spacing={3}>
                        <Grid item xs={4} >
                            <Fab variant="extended" className={classes.fabDelete} onClick={cancelAppointment}>
                                <DeleteIcon className={classes.IconEditSize}/>
                                Отменить
                                </Fab>
                                <Fab onClick={cancelAppointment} className={classes.fabDelIcon} onClick={cancelAppointment}>
                                <DeleteIcon />
                                <div>Отменить</div>
                            </Fab>
                        </Grid>
                        <Grid item xs={4} >
                                <Fab variant="extended" className={classes.fabDescription} onClick={showDetails}>
                                <DescriptionIcon className={classes.IconEditSize}/>
                                Детали
                                </Fab>
                                <Fab className={classes.fabDescIcon} onClick={showDetails}>
                                <DescriptionIcon />
                                <div>Детали</div>
                            </Fab>
                        </Grid>
                        <Grid item xs={4} >
                            <Fab variant="extended" className={classes.fabCheckCircle} onClick={showMedicalReport}>
                                <CheckCircleIcon className={classes.IconEditSize}/>
                                Обслужить
                                </Fab>
                                <Fab className={classes.fabCheckIcon} onClick={showMedicalReport}>
                                <CheckCircleIcon  />
                                <div>Обслужить</div>
                            </Fab>
                        </Grid>
                        </Grid>
                            {/* <Button variant="outlined" onClick={cancelAppointment}>Отменить</Button>{' '}
                            <Button variant="outlined" onClick={showDetails}>Детали</Button>{' '}
                            <Button variant="outlined" onClick={showMedicalReport}>Обслужить</Button> */}     
                </Grid>
             : 
                <Grid item xs={6}>
                    <Grid container justify="space-evenly" alignItems="center" spacing={2}>
                    <Grid item>
                    <Fab variant="extended" onClick={openModal} className={classes.fabEdit}>
                        <EditIcon  className={classes.IconSize}/>
                        Добавить
                    </Fab>
                    <Fab onClick={openModal}  className={classes.fabEdIcon}>
                        <EditIcon />
                        Добавить
                    </Fab>
                    </Grid>
                    <Grid item>
                            <Typography>Свободно</Typography>
                    </Grid>
                </Grid>
                </Grid>
               
                  } 
                   </Grid>
            <AppointmentDetailModal 
                open={detailsOpen} 
                onClose={() => setDetailsOpen(false)}
                date={date} 
                startTime={startTime} 
                endTime={endTime} 
                patientName={patientName} 
                patientPhoneNumber={patientPhoneNumber}
                patientBirthDate={patientBirthDate}
            />
            <SaveMedicalReportModal 
                open={medicalReportOpen} 
                onClose={() => setMedicalReportOpen(false)}
                appointmentId={appointmentId}
                patientName={patientName} 
                patientPhoneNumber={patientPhoneNumber}
                patientBirthDate={patientBirthDate}
                onSaveMedicalReport={onSaveMedicalReport}
            />
        <IsNewUserModal open={IsNewUserModalOpen} onClose={CloseModal} openRegisterModal={openRegisterModal}/>
        <RegisterModal open={registerModalOpen} onClose={closeRegisterModal}/>
        </Card>
    );
};

export default DoctorFutureAppointmentItem
