import React from "react";
import {Card, Grid, Typography} from "@material-ui/core";
import {makeStyles, useTheme} from "@material-ui/styles";
import dateFormat from 'dateformat'
import PatientService from "../../service/PatientService";
import {red} from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import RegisterModal from '../landing/RegisterModal'


const useStyles = makeStyles(theme => ({
    appointmentContainer: {
        paddingTop: '15px',
        paddingBottom: '15px',
        paddingLeft: '15px',
        marginBottom: '10px'
    },
    fabDelete: {
        backgroundColor: red[900],
        width: '100%',
        height: "5vh",
        fontSize: "1.3vw",
        color: "white",
        '&:hover': {
            backgroundColor: "white",
            color: red[500]
        },
        [theme.breakpoints.up('xl')]: {
            height: "3vh",
            fontSize: "1vw"
        },
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },

    },
    IconEditSize: {
        width: "3vh",
        height: "5vh",
        [theme.breakpoints.up('xl')]: {
            height: "2vh",
            fontSize: "1vw"
        },
    },
    font_for_typography: {
        fontSize: "1.3vw",
        [theme.breakpoints.between('xs', 'sm')]: {
            fontSize: "1.8vw",
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: "2vh",
        },
    },
    fabDelIcon: {
        backgroundColor: red[900],
        color: "white",
        display: 'none',
        '&:hover': {
            backgroundColor: "white",
            color: red[500]
        },
        [theme.breakpoints.down('xs')]: {
            display: 'inline',
            fontSize: '1.8vw',

        },
    },


}))

const FutureAppointmentItem = props => {
    const classes = useStyles()
    const theme = useTheme();
    const {date, startTime, endTime, appointmentId, onCancel} = props
    const [IsNewUserModalOpen, setIsNewUserModalOpen] = React.useState(false)
    const [registerModalOpen, setRegisterModalOpen] = React.useState(false)
    const matches = useMediaQuery('(min-height:800px) and (min-width:480px)');
    const matcheSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const openRegisterModal = () => setRegisterModalOpen(true)
    const closeRegisterModal = () => setRegisterModalOpen(false)
    const cancelAppointment = async () => {
        try {
            await PatientService.cancelAppointment(appointmentId)
            onCancel()
        } catch (err) {
            console.error(err)
        }
    }

    const openModal = () => {
        setIsNewUserModalOpen(true);
    }
    const CloseModal = () => {
        setIsNewUserModalOpen(false);
    }
    return (
        <Card className={classes.appointmentContainer}>
            <Grid container spacing={3}
                  justify="space-between"
                  alignItems="center">
                <Grid item xs={6} md={6} xl={6}>
                    <Typography variant="h6" className={classes.font_for_typography}>
                        {dateFormat(date, 'dddd dd mmmm')}, {dateFormat(startTime, 'HH:MM')} - {dateFormat(endTime, 'HH:MM')}
                    </Typography>
                </Grid>

                <Grid item xs={4} md={2} xl={3}>
                    <Fab variant="extended" className={classes.fabDelete} onClick={cancelAppointment}>
                        <DeleteIcon className={classes.IconEditSize}/>
                        Отменить
                    </Fab>
                    <Fab className={classes.fabDelIcon} onClick={cancelAppointment}>
                        <DeleteIcon/>
                        Отменить
                    </Fab>
                </Grid>
            </Grid>
            <RegisterModal open={registerModalOpen} onClose={closeRegisterModal}/>
        </Card>
    )
}


export default FutureAppointmentItem;
