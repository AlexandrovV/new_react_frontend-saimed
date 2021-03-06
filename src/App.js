import React, { useState } from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import "./App.css";
import Landing from "./components/landing/Landing";
import LandingMedic from "./components/landing/LandingMedic";
import MedPage from "./components/landing/MedPage";
import PatientCabinet from "./components/patientCabinet/PatientCabinet";
import AlertSnackbar from "./components/shared/AlertSnackbar";
import { AlertContext } from './context/AlertContext'
import DoctorCabinet from "./components/doctorCabinet/DoctorCabinet";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import LuxonUtils from '@date-io/luxon';
import AuthRoute from "./components/shared/AuthRoute";
import ResetPasswordPage from "./components/resetPassword/ResetPasswordPage";
import UserAppointments from "./components/doctorCabinet/users/UserAppointments";

const App = props => {
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertSeverity, setAlertSeverity] = useState('error')


  return (
    
    <AlertContext.Provider value={{
      showError: message => {
        setAlertMessage(message)
        setAlertSeverity('error')
        setAlertOpen(true)
      },
      showSuccess: message => {
        setAlertMessage(message)
        setAlertSeverity('success')
        setAlertOpen(true)
      }
    }}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route path="/cabinet">
              <PatientCabinet />
            </Route>
            <Route path="/admin">
              <DoctorCabinet />
            </Route>

            <Route path="/LandingMedic">
              <LandingMedic />
            </Route>
            <Route path="/MedPage">
              <MedPage />
            </Route>
            <Route path='/reset-password'>
              <ResetPasswordPage />
            </Route>
            <Redirect to="/" />
          </Switch>
        </Router>
      </MuiPickersUtilsProvider>
      <AlertSnackbar message={alertMessage} open={alertOpen} handleClose={e => setAlertOpen(false)} severity={alertSeverity} />
    </AlertContext.Provider>
  )
}

export default App;
