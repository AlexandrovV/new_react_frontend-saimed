import React, {useState, useEffect, useContext} from "react";
import { Container, Grid, Typography, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import DoctorFutureAppointmentItem from "./DoctorFutureAppointmentItem";
import DoctorPastAppointmentItem from "./DoctorPastAppointmentItem";
import DoctorService from "../../service/DoctorService";
 import MaterialTable from "material-table";
import {DatePicker} from "@material-ui/pickers";
import dateFormat from 'dateformat'
import IsNewUserModal from "../landing/IsNewUserModal";
import RegisterModal from "../landing/RegisterModal";
import SaveMedicalReportModal from "./SaveMedicalReportModal";
import {AlertContext} from "../../context/AlertContext";
import AppointmentDetailModal from "./AppointmentDetailsModal";
// import CreateNewUserModal from "../landing/CreateNewUserModal";
import PatientService from "../../service/PatientService";

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
    const [pastAppointments, setPastAppointments] = useState([])
    const [selectedDate, handleDateChange] = useState(new Date())
    const [medicalReportOpen, setMedicalReportOpen] = useState(false)
    const [IsNewUserModalOpen, setIsNewUserModalOpen] = React.useState(false)
    const [startTime,setStartTime] = React.useState('')
    const [createNewUserModalOpen, setCreateNewUserModalOpen] = React.useState(false)
    const { showError, showSuccess } = useContext(AlertContext)
    let tableRef = React.createRef();

    const [patientName,setPatientName]=React.useState('')
    const [patientPhoneNumber,setPatientPhoneNumber]=React.useState('')
    const [appointmentId,setAppointmentId]=React.useState('')
    const [patientBirthDate,setPatientBirthDate]=React.useState('')


    const { onSaveMedicalReport} = props

    const openRegisterModal = () => setCreateNewUserModalOpen(true)
    const closeCreateNewUserModal = () => setCreateNewUserModalOpen(false)

    const openModal=(startTime)=>{
        setAppointmentId(startTime)
        setIsNewUserModalOpen(true);
    }
    const CloseModal=()=>{
        setIsNewUserModalOpen(false);
    }
    const localizeStatus = status => {
        switch (status) {
            case 'FREE': return 'Свободно'
            case 'RESERVED': return 'Занято'
            case 'BLOCKED': return 'Нерабочее время'
            case 'CANCELLED': return 'Свободно'
            case 'FINISHED': return 'Завершено'
            default: return status
        }
    }

    const fetchData = async () => {
        try {

            const data = await DoctorService.getCurrentDayAppointments(selectedDate)
            const formattedData = data.map(a => { return {
                ...a,
                startTime: dateFormat(a.startTime, 'HH:MM') + ' - ' + dateFormat(a.endTime, 'HH:MM'),
                localizedStatus: localizeStatus(a.status),
                patientName: a.patientName || '-'
            } })
            console.log(formattedData);
            setFutureAppointments(formattedData);
        } catch (err) {
            console.error(err)
        }
    }
    const cancelAppointment = async (id) => {
        try {
            console.log(id);
            await DoctorService.cancelAppointment(id)
            fetchData()
            showSuccess('Запись успешно отменена!')
        } catch (err) {
            showError(err)
        }
    }


    const showMedicalReport = (id,patientName,patientBirthDate,patientPhoneNumber)=> {
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
                                        disablePast
                                        orientation="portrait"
                                        openTo="date"
                                        onChange={handleDateChange}
            />
             </Grid>
            <Grid item xs={12} md={9}>
                <MaterialTable
                    title="Positioning Actions Column Preview"
                    columns={[
                        { title: 'Время', field: 'startTime',  },
                        { title: 'Ф.И.О', field: 'patientName' },
                        { title: 'Статус', field:'localizedStatus'}
                    ]}
                    data={futureAppointments}
                    tableRef={ tableRef }
                    actions={[
                        dataRow => ({
                            icon: 'library_add',
                            tooltip: 'Забронировать время',
                            onClick: (event, rowData) => openModal(dataRow.id),
                            hidden: dataRow.status !== 'FREE'
                        }),
                        rowData => ({
                            icon: 'create',
                            tooltip: 'Заполнить медицинское заключение',
                            onClick: (event, rowData) =>
                                showMedicalReport(rowData.id,rowData.patientName,rowData.patientBirthDate,rowData.patientPhoneNumber),
                            hidden:rowData.status !== 'RESERVED'
                        }),
                        rowData => ({
                            icon: 'remove_circle',
                            tooltip: 'Отменить бронирование',
                            onClick: (event, rowData) =>
                                cancelAppointment(rowData.id),
                            hidden: rowData.status !== 'RESERVED'
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

                <IsNewUserModal open={IsNewUserModalOpen} onClose={CloseModal} openRegisterModal={openRegisterModal} startTime={appointmentId} fetchData_Table={fetchData}/>
                {/*<CreateNewUserModal open={createNewUserModalOpen} onClose={closeCreateNewUserModal} startTime={startTime}/>*/}
                {/*<AppointmentDetailModal*/}
                {/*    open={detailsOpen}*/}
                {/*    onClose={() => setDetailsOpen(false)}*/}
                {/*    date={date}*/}
                {/*    startTime={startTime}*/}
                {/*    endTime={endTime}*/}
                {/*    patientName={patientName}*/}
                {/*    patientPhoneNumber={patientPhoneNumber}*/}
                {/*    patientBirthDate={patientBirthDate}*/}
                {/*/>*/}
                {/*{*/}
                {/*    pastAppointments.length > 0 ? pastAppointments.map(a =>*/}
                {/*        <Grid item xs={12} key={a.id}>*/}
                {/*            <DoctorPastAppointmentItem*/}
                {/*                date={a.date}*/}
                {/*                startTime={a.startTime}*/}
                {/*                endTime={a.endTime}*/}
                {/*                appointmentId={a.id}*/}
                {/*            />*/}
                {/*        </Grid>*/}
                {/*    ) :*/}
                {/*    <Grid item xs={12}>*/}
                {/*        <Card className={classes.emptyAppointments}>*/}
                {/*            <Typography>У вас нет прошедших приёмов</Typography>*/}
                {/*        </Card>*/}
                {/*    </Grid>*/}
                {/*}*/}
            </Grid>
            </Grid>

        </Container>

    )
}

export default DoctorAppointmentsList