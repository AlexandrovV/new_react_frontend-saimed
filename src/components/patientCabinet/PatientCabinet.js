import React from 'react'
import PatientCabinetAppBar from './PatientCabinetAppBar'
import { makeStyles } from '@material-ui/styles'
import { Route } from 'react-router-dom'
import AppointmentPage from './AppointmentPage'
import PatientAppointmentsList from './PatientAppointmentsList'
import AuthRoute from '../shared/AuthRoute'

const useStyles = makeStyles(theme => ({
    background: {
        backgroundColor: '#f5f5f5'
    }
}))

const PatientCabinet = props => {
    const classes = useStyles()

    return (
        <div className={classes.background}>
            <PatientCabinetAppBar />
            <AuthRoute exact path='/cabinet' redirectUrl='/'>
                <PatientAppointmentsList />
            </AuthRoute>
            <AuthRoute exact path='/cabinet/makeAppointment' redirectUrl='/'>
                <AppointmentPage />
            </AuthRoute>
        </div>
    )
}

export default PatientCabinet