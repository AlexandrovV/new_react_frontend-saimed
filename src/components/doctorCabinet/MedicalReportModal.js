import React, { useState, useContext, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import dateFormat from 'dateformat'
import DoctorService from '../../service/DoctorService'
import { AlertContext } from '../../context/AlertContext'

const useStyles = makeStyles({
    dialogTitle: {
        textAlign: 'center'
    },
    marginTop: {
        marginTop: '15px'
    }
})

const MedicalReportModal = props => {
    const classes = useStyles()
    const { showError } = useContext(AlertContext)

    const [medicalReport, setMedicalReport] = useState(null) 

    const { open, onClose, appointmentId } = props

    const fetchData = async () => {
        try {
            if (appointmentId === null) return
            const medReport = await DoctorService.getMedicalReport(appointmentId)
            setMedicalReport(medReport)
        } catch (err) {
            showError(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [props.open])

    const downloadMedicalReport = async () => {
        try {
            await DoctorService.downloadMedicalReport(appointmentId)
        } catch (err) {
            showError(err)
        }
    }

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" maxWidth="md" fullWidth>
            <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>Медицинское заключение</DialogTitle>
            <DialogContent>
                {
                    medicalReport != null ?
                    (
                        <div>
                            <Typography><b>Ф.И.О:</b> {medicalReport.patientFullName}</Typography>
                            <Typography><b>Номер телефона:</b> {medicalReport.patientPhoneNumber}</Typography>
                            <Typography><b>Дата рождения:</b> {dateFormat(medicalReport.patientBirthDate, 'dd.mm.yyyy')}</Typography>
                            <Typography><b>Жалобы:</b> {medicalReport.complaints}</Typography>
                            <Typography><b>Анамнез жизни:</b> {medicalReport.anamnesMorbi}</Typography>
                            <Typography><b>Предварительный диагноз:</b> {medicalReport.mkbDiagnosis}</Typography>
                            <Typography><b>Рекомендации:</b> {medicalReport.recommendations}</Typography>
                        </div>
                    ) : null
                }
                
            </DialogContent>
            <DialogActions>
                
            <Button onClick={downloadMedicalReport} variant="outlined" color="primary">
                Скачать
            </Button>{' '}

            <Button onClick={onClose} variant="outlined" color="primary">
                Закрыть
            </Button>
         </DialogActions>
     
        </Dialog>
    )
}
  
export default MedicalReportModal