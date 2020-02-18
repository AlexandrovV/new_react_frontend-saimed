import React from 'react'
import DoctorAppointmentsList from './DoctorAppointmentsList'
import DoctorCabinetAppBar from './DoctorCabinetAppBar'
import { makeStyles } from '@material-ui/styles'
import { Route } from 'react-router-dom'
import GenerateAppointments from './GenerateAppointments'
import DoctorCabinetLoginPage from './DoctorCabinetLoginPage'
import AuthRoute from '../shared/AuthRoute'

const useStyles = makeStyles(theme => ({
    background: {
        backgroundColor: '#f5f5f5'
    }
}))

const DoctorCabinet = props => {
    const classes = useStyles()

    return (
        <div className={classes.background}>
            <Route exact path='/admin/login'>
                <DoctorCabinetLoginPage />
            </Route>
            <AuthRoute exact path='/admin/generateAppointments' redirectUrl='/admin/login' >
                <DoctorCabinetAppBar />
                <GenerateAppointments />
            </AuthRoute>
            <AuthRoute exact path='/admin' redirectUrl='/admin/login' >
                <DoctorCabinetAppBar />
                <DoctorAppointmentsList />
            </AuthRoute>
        </div>
    )
}

export default DoctorCabinet