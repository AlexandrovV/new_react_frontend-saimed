import React, { useContext } from 'react'
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
const useStyles = makeStyles({
    dialogTitle: {
        textAlign: 'center'
    },
    IconSize:{
        fontSize:"20vh",
    },
    FabSize:{
        height:"25vh",
        backgroundColor:"white"
    }
})

const IsNewUserModal = props => {
    const history = useHistory()
    const [registerModalOpen, setRegisterModalOpen] = React.useState(false)
    const { open, onClose,openRegisterModal} = props

    const openRegistration = () => {
        onClose()
        openRegisterModal()
    }
    const classes = useStyles()
    
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
                Забронировать время для пользователя
            </DialogTitle>
            <DialogActions>
                <Grid container spacing={1} justify="center" alignItems="center">
                <Grid item xs={6} className={classes.dialogTitle}>
                    <Fab variant="extended" onClick={openRegistration} className={classes.FabSize}>
                    <PersonAddIcon className={classes.IconSize}/>
                    </Fab>
                    <div>
                    Новый
                    </div>
                </Grid>
                <Grid item xs={6} className={classes.dialogTitle}>
                    <Fab variant="extended" className={classes.FabSize}>
                    <ContactsIcon className={classes.IconSize}/>
                    </Fab>
                    <div>
                    Существующий
                    </div>
                </Grid>
            </Grid>
         </DialogActions>
        </Dialog>
    )
}

  
export default IsNewUserModal