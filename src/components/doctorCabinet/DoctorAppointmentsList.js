import React, {useContext, useEffect, useState} from "react";
import {Container, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import DoctorService from "../../service/DoctorService";
import MaterialTable from "material-table";
import {DatePicker} from "@material-ui/pickers";
import dateFormat from 'dateformat'
import IsNewUserModal from "../landing/IsNewUserModal";
import SaveMedicalReportModal from "./SaveMedicalReportModal";
import {AlertContext} from "../../context/AlertContext";
import MedicalReportModal from "./MedicalReportModal";
import RegisterNewUser from '../landing/RegisterNewUser';

const useStyles = makeStyles(theme => ({
    subheading: {
        fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';",
        fontSize: '20px',
        marginTop: '20px',
        marginBottom: '10px'
    },
    emptyAppointments: {
        padding: '20px',
        marginBottom: '10px'
    }
}))

const DoctorAppointmentsList = props => {
    const classes = useStyles()
    const [futureAppointments, setFutureAppointments] = useState([])
    const [selectedDate, handleDateChange] = useState(new Date())
    const [medicalReportOpen, setMedicalReportOpen] = useState(false)
    const [IsNewUserModalOpen, setIsNewUserModalOpen] = React.useState(false)
    const {showError, showSuccess} = useContext(AlertContext)
    let tableRef = React.createRef();
    const [detailsOpen, setDetailsOpen] = useState(false)
    const [patientName, setPatientName] = React.useState('')
    const [patientPhoneNumber, setPatientPhoneNumber] = React.useState('')
    const [appointmentId, setAppointmentId] = React.useState(null)
    const [patientBirthDate, setPatientBirthDate] = React.useState('')

    const closeDetails = () => setDetailsOpen(false)

    const openModal = (id) => {
        setAppointmentId(id)
        setIsNewUserModalOpen(true);
    }
    let moment = require('moment');

    const openDetailsModal = id => {
        setAppointmentId(id)
        setDetailsOpen(true)
    }

    const CloseModal = () => {
        setIsNewUserModalOpen(false);
    }

    const onSaveMedicalReport = () => {
        fetchData()
    }


    const localizeStatus = status => {
        switch (status) {
            case 'FREE':
                return 'Свободно'
            case 'RESERVED':
                return 'Занято'
            case 'BLOCKED':
                return 'Нерабочее время'
            case 'CANCELLED':
                return 'Свободно'
            case 'FINISHED':
                return 'Завершено'
            case 'TIMEOUT':
                return 'Время прошло'
            default:
                return status
        }
    }

    const fetchData = async () => {
        try {
            const data = await DoctorService.getAppointmentsByDate(selectedDate)
            const formattedData = data.map(a => {
                return {
                    ...a,
                    startTime: moment(a.startTime).format('HH:mm')+ ' - ' +moment(a.endTime).format('HH:mm'),
                    // dateFormat(a.startTime, 'HH:MM') + ' - ' + dateFormat(a.endTime, 'HH:MM'),
                    localizedStatus: localizeStatus(a.status),
                    patientName: a.patientName || '-',
                    patientPhoneNumber: a.patientPhoneNumber || '-',
                    time_status:moment(a.startTime).isBefore(Date.now())
                }
            })
            setFutureAppointments(formattedData);
        } catch (err) {
            showError(err)
        }
    }

    const cancelAppointment = async (id) => {
        try {
            await DoctorService.cancelAppointment(id)
            fetchData()
            showSuccess('Запись успешно отменена!')
        } catch (err) {
            showError(err)
        }
    }

    const blockAppointment = async (id) => {
        try {
            await DoctorService.blockAppointment(id)
            fetchData()
            showSuccess('Запись успешно заблокирована!')
        } catch (err) {
            showError(err)
        }
    }

    const unblockAppointment = async (id) => {
        try {
            await DoctorService.unblockAppointment(id)
            fetchData()
            showSuccess('Запись успешно разблокирована!')
        } catch (err) {
            showError(err)
        }
    }

    const showMedicalReport = (id, patientName, patientBirthDate, patientPhoneNumber) => {
        setAppointmentId(id);
        setPatientName(patientName);
        setPatientPhoneNumber(patientPhoneNumber);
        setPatientBirthDate(patientBirthDate);
        setMedicalReportOpen(true);
    }

    useEffect(() => {
        fetchData()
    }, [selectedDate])

    return (
        <Container>
            <Typography className={classes.subheading}>Записи:</Typography>
            <Grid container spacing={5}>
                <Grid item xs={12} md={3}>
                    {/*<Typography className={classes.subheading}>Выберите дату:</Typography>*/}
                    <DatePicker value={selectedDate}
                                autoOk
                                variant="static"
                                orientation="portrait"
                                openTo="date"
                                disablePast="true"
                                onChange={handleDateChange}
                    />
                </Grid>
                <Grid item xs={12} md={9}>
                    <MaterialTable
                        title="Записи"
                        columns={[
                            {title: 'Время', field: 'startTime',},
                            {title: 'Ф.И.О', field: 'patientName'},
                            {title: 'Номер телефона', field: 'patientPhoneNumber'},
                            {title: 'Статус', field: 'localizedStatus'}
                        ]}
                        data={futureAppointments}
                        tableRef={tableRef}
                        actions={[
                            dataRow => ({
                                icon: 'library_add',
                                tooltip: 'Забронировать время',
                                onClick: (event, rowData) => openModal(dataRow.id),
                                hidden: dataRow.status !== 'FREE' || dataRow.time_status,
                            }),
                            rowData => ({
                                icon: 'create',
                                tooltip: 'Заполнить медицинское заключение',
                                onClick: (event, rowData) =>
                                    showMedicalReport(rowData.id, rowData.patientName, rowData.patientBirthDate, rowData.patientPhoneNumber),
                                hidden: rowData.status !== 'RESERVED' || rowData.time_status,

                            }),
                            rowData => ({
                                icon: 'remove_circle',
                                tooltip: 'Отменить бронирование',
                                onClick: (event, rowData) =>
                                    cancelAppointment(rowData.id),
                                hidden: rowData.status !== 'RESERVED' || rowData.time_status,

                            }),
                            rowData => ({
                                icon: 'receipt',
                                tooltip: 'Медицинское заключение',
                                onClick: (event, rowData) => openDetailsModal(rowData.id),
                                hidden: rowData.status !== 'FINISHED' || rowData.time_status,

                            }),
                            rowData => ({
                                icon: 'visibility_off',
                                tooltip: 'Заблокировать время',
                                onClick: (event, rowData) => blockAppointment(rowData.id),
                                hidden: rowData.status !== 'FREE' || rowData.time_status,
                            }),
                            rowData => ({
                                icon: 'visibility',
                                tooltip: 'Разблокировать время',
                                onClick: (event, rowData) => unblockAppointment(rowData.id),
                                hidden: rowData.status !== 'BLOCKED' || rowData.time_status,
                            }),
                            {
                                icon: 'refresh',
                                tooltip: 'Refresh Data',
                                isFreeAction: true,
                                onClick: () => fetchData(),
                            }
                        ]}
                        options={{
                            actionsColumnIndex: -1,
                            padding: "dense",
                            pageSizeOptions: [10, 15, 20],
                            pageSize: 15
                        }}
                    />
                    <SaveMedicalReportModal
                        open={medicalReportOpen}
                        onClose={() => setMedicalReportOpen(false)}
                        appointmentId={appointmentId}
                        patientName={patientName}
                        patientPhoneNumber={patientPhoneNumber}
                        patientBirthDate={patientBirthDate}
                        onSaveMedicalReport={onSaveMedicalReport}
                    />

                    <IsNewUserModal open={IsNewUserModalOpen} onClose={CloseModal} startTime={appointmentId}
                                    fetchData_Table={fetchData} />

                    <MedicalReportModal
                        open={detailsOpen}
                        onClose={closeDetails}
                        appointmentId={appointmentId}
                    />
                    

                </Grid>
            </Grid>

        </Container>

    )
}

export default DoctorAppointmentsList