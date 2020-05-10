import React, {useContext, useEffect, useState} from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from "@material-ui/core/Grid";
import { TextField, Button, Snackbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AuthService from '../../service/AuthService'
import Fab from "@material-ui/core/Fab";
import { useHistory } from "react-router-dom"
import Alert from '@material-ui/lab/Alert';
import { AlertContext } from '../../context/AlertContext'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ContactsIcon from '@material-ui/icons/Contacts';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DoctorService from "../../service/DoctorService";
import dateFormat from "dateformat";
import PatientService from "../../service/PatientService";

const useStyles = makeStyles({
    dialogTitle: {
        textAlign: 'center'
    }
})

const IsNewUserModal = props => {
    const history = useHistory()
    const { open, onClose,} = props
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [pastAppointments, setPastAppointments] = useState([])
    const [selectedTime, setSelectedTime] = useState(null)
    const {startTime,endTime, fetchData_Table} = props
    const [value,setValue]=React.useState('');
    const { showError, showSuccess } = useContext(AlertContext)

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    const fetchData = async () => {
        try {

            const data = await DoctorService.GetUsers()
            console.log(data);
            setPastAppointments(data);
        } catch (err) {
            console.error(err)
        }
    }
    const makeAppointment = async () => {
        try {
            console.log(value.id)
            console.log(startTime)
            await DoctorService.makeAppointmentByDoctor(startTime,value.id)
            fetchData_Table();
            showSuccess('Пользователь успешно забронирован');
            onClose()
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        window.addEventListener("load", () => {
            fetchData()
        });
    })
    const classes = useStyles()
    
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
                Выберите пользователя
            </DialogTitle>
            <DialogContent>
                    <Autocomplete
                        id="combo-box-demo"
                        options={pastAppointments}
                        getOptionLabel={(option) => option.fullName}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField style={{ width: '100%' }}  {...params} label="Combo box" variant="outlined" />}
                    />
            </DialogContent>
            <DialogActions>
                <Button onClick={makeAppointment} variant="contained" color="primary" >
                    Записать
                </Button>
            </DialogActions>
        </Dialog>
    )
}


  
export default IsNewUserModal