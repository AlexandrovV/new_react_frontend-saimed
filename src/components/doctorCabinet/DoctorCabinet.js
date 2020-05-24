import React from 'react'
import DoctorAppointmentsList from './DoctorAppointmentsList'
import DoctorCabinetAppBar from './DoctorCabinetAppBar'
import { makeStyles } from '@material-ui/styles'
import { Route } from 'react-router-dom'
import GenerateAppointments from './GenerateAppointments'
import DoctorCabinetLoginPage from './DoctorCabinetLoginPage'
import AuthRoute from '../shared/AuthRoute'
import MkbTable from "./mkb/MkbTable";
import UsersTable from "./users/UsersTable";
import UserAppointments from "./users/UserAppointments";

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
            <AuthRoute exact path='/admin/generateAppointments' role="ROLE_ADMIN" redirectUrl='/admin/login' >
                <DoctorCabinetAppBar />
                <GenerateAppointments />
            </AuthRoute>
            <AuthRoute exact path='/admin/mkbManagement' role="ROLE_ADMIN" redirectUrl='/admin/login' >
                <DoctorCabinetAppBar />
                <MkbTable />
            </AuthRoute>
            <AuthRoute exact path='/admin/usersManagement' role="ROLE_ADMIN" redirectUrl='/admin/login' >
                <DoctorCabinetAppBar />
                <UsersTable />
            </AuthRoute>
            <AuthRoute exact path='/admin' role="ROLE_ADMIN" redirectUrl='/admin/login' >
                <DoctorCabinetAppBar />
                <DoctorAppointmentsList />
            </AuthRoute>
            <AuthRoute exact path='/admin/user_appointments/:userId' role="ROLE_ADMIN" redirectUrl='/admin/login' >
                <DoctorCabinetAppBar />
                <UserAppointments />
            </AuthRoute>
        </div>
    )
}

export default DoctorCabinet