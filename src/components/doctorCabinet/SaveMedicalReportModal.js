import React, { useState, useContext } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Button, Typography, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import dateFormat from 'dateformat'
import DoctorService from '../../service/DoctorService'
import { AlertContext } from '../../context/AlertContext'
import MkbSelect from './MkbSelect'

const useStyles = makeStyles({
    dialogTitle: {
        textAlign: 'center'
    },
    marginTop: {
        marginTop: '15px'
    }
})

const SaveMedicalReportModal = props => {
    const classes = useStyles()
    const { showError, showSuccess } = useContext(AlertContext)

    const [anamnesMorbi, setAnamnesMorbi] = useState('')
    const [recommendations, setRecommendations] = useState('')
    const [selectedDiagnosis, setSelectedDiagnosis] = useState(null)

    const { open, onClose, onSaveMedicalReport, appointmentId, patientName, patientPhoneNumber, patientBirthDate } = props

    const saveMedicalReport = async () => {
        try {
            await DoctorService.addMedicalReport(
                {
                    appointmentId,
                    anamnesMorbi,
                    recommendations,
                    mkbDiagnosisId: selectedDiagnosis
                }
            )
            onSaveMedicalReport()
            onClose()
            showSuccess('Медицинский отчет удачно закреплен!')
        } catch (err) {
            showError(err)
        }
    }

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" maxWidth="md" fullWidth>
            <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>Медицинское заключение</DialogTitle>
            <DialogContent>
                <Typography><b>Ф.И.О:</b> {patientName}</Typography>
                <Typography><b>Номер телефона:</b> {patientPhoneNumber}</Typography>
                <Typography><b>Дата рождения:</b> {dateFormat(patientBirthDate, 'dd.mm.yyyy')}</Typography>
                <TextField
                    className={classes.marginTop}
                    value={anamnesMorbi}
                    placeholder="Введите анамез жизни"
                    label="Anamnes Morbi"
                    onChange={e => setAnamnesMorbi(e.target.value)}
                    multiline
                    fullWidth
                />
                <MkbSelect selectedDiagnosis={selectedDiagnosis} setSelectedDiagnosis={setSelectedDiagnosis} />
                <TextField
                    className={classes.marginTop}
                    label="Рекомендации"
                    placeholder="Введите рекомендации"
                    value={recommendations}
                    onChange={e => setRecommendations(e.target.value)}
                    multiline
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                
            <Button onClick={onClose} variant="outlined" color="primary">
                Закрыть
            </Button>
            <Button onClick={saveMedicalReport} variant="outlined" color="primary">
                Завершить приём
            </Button>
         </DialogActions>
     
        </Dialog>
    )
}

  
export default SaveMedicalReportModal