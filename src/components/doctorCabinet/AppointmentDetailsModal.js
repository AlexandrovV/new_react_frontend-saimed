import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import dateFormat from 'dateformat'

const useStyles = makeStyles({
    dialogTitle: {
        textAlign: 'center'
    }
})

const AppointmentDetailModal = props => {
    const classes = useStyles()

    const { open, onClose, date, startTime, endTime, patientName, patientPhoneNumber, patientBirthDate } = props
    
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
            <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>Детали записи</DialogTitle>
            <DialogContent>
                <Typography><b>Дата:</b>{dateFormat(date, 'dddd dd mmmm')},{dateFormat(startTime, 'HH:MM')} - {dateFormat(endTime, 'HH:MM')}</Typography>
                <Typography><b>Ф.И.О:</b> {patientName}</Typography>
                <Typography><b>Номер телефона:</b> {patientPhoneNumber}</Typography>
                <Typography><b>Дата рождения:</b> {dateFormat(patientBirthDate, 'dd.mm.yyyy')}</Typography>
            </DialogContent>
            <DialogActions>
                
            <Button onClick={onClose} variant="outlined" color="primary">
                Закрыть
            </Button>
         </DialogActions>
     
        </Dialog>
    )
}

  
export default AppointmentDetailModal