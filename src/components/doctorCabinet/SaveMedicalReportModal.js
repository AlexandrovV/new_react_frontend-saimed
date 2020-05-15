import React, {useState, useContext, useEffect} from 'react'
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
import {KeyboardDatePicker} from "@material-ui/pickers";

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

    const { open, onClose, onSaveMedicalReport, appointmentId } = props

    const [patientName, setPatientName] = useState('')
    const [patientPhoneNumber, setPatientPhoneNumber] = useState('')
    const [patientBirthDate, setPatientBirthDate] = useState(new Date())
    const [complaints, setComplaints] = useState('')
    const [anamnesMorbi, setAnamnesMorbi] = useState('')
    const [recommendations, setRecommendations] = useState('')
    const [selectedDiagnosis, setSelectedDiagnosis] = useState(null)
    const [objectiveInspection, setObjectiveInspection] = useState('')
    const [nextAppointmentDate, setNextAppointmentDate] = useState(new Date())

    const saveMedicalReport = async () => {
        try {
            console.log(nextAppointmentDate)
            await DoctorService.addMedicalReport(
                {
                    patientName,
                    patientPhoneNumber,
                    patientBirthDate,
                    appointmentId,
                    complaints,
                    objectiveInspection,
                    anamnesMorbi,
                    recommendations,
                    mkbDiagnosisId: selectedDiagnosis,
                    nextAppointmentDate
                }
            )
            onSaveMedicalReport()
            onClose()
            showSuccess('Медицинский отчет удачно закреплен!')
        } catch (err) {
            showError(err)
        }
    }
    console.log(props.patientName)
    useEffect(() => {
        setPatientName(props.patientName)
        setPatientPhoneNumber(props.patientPhoneNumber)
        setPatientBirthDate(props.patientBirthDate)
    }, [props.patientName])

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" maxWidth="md" fullWidth>
            <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>Медицинское заключение</DialogTitle>
            <DialogContent>
                <TextField
                    className={classes.marginTop}
                    value={patientName}
                    placeholder="Введите Ф.И.О. пациента"
                    label="Ф.И.О. пациента"
                    onChange={e => setPatientName(e.target.value)}
                    multiline
                    fullWidth
                />
                <TextField
                    className={classes.marginTop}
                    value={patientPhoneNumber}
                    placeholder="Введите контактный номер пациента"
                    label="Контактный номер"
                    onChange={e => setPatientPhoneNumber(e.target.value)}
                    multiline
                    fullWidth
                />
                <KeyboardDatePicker
                    className={classes.marginTop}
                    label="Дата рождения пациента"
                    value={patientBirthDate}
                    onChange={setPatientBirthDate}
                    fullWidth
                    format="dd.MM.yyyy"
                    autoOk
                />
                <TextField
                    className={classes.marginTop}
                    value={complaints}
                    placeholder="Введите жалобы"
                    label="Жалобы"
                    onChange={e => setComplaints(e.target.value)}
                    multiline
                    fullWidth
                />
                <TextField
                    className={classes.marginTop}
                    value={anamnesMorbi}
                    placeholder="Введите анамез жизни"
                    label="Anamnes Morbi"
                    onChange={e => setAnamnesMorbi(e.target.value)}
                    multiline
                    fullWidth
                />
                <TextField
                    className={classes.marginTop}
                    value={objectiveInspection}
                    placeholder="Введите объективный осмотр"
                    label="Объективный осмотр"
                    onChange={e => setObjectiveInspection(e.target.value)}
                    multiline
                    // rows={5}
                    // variant="outlined"
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
                <KeyboardDatePicker
                    className={classes.marginTop}
                    label="Дата следующего приёма пациента"
                    value={nextAppointmentDate}
                    onChange={setNextAppointmentDate}
                    fullWidth
                    format="dd.MM.yyyy"
                    autoOk
                />
            </DialogContent>
            <DialogActions>
                
            <Button onClick={onClose} variant="outlined" color="primary">
                Закрыть
            </Button>
            <Button onClick={saveMedicalReport} variant="contained" color="primary" >
                Закрепить медицинское заключение
            </Button>
         </DialogActions>
     
        </Dialog>
    )
}

  
export default SaveMedicalReportModal