import React, {useContext, useEffect, useState} from 'react'
import {Container, Grid} from '@material-ui/core'
import MaterialTable from "material-table";
import CreateUserModal from "./CreateUserModal";
import {AlertContext} from "../../../context/AlertContext";
import DoctorService from "../../../service/DoctorService";
import dateFormat from 'dateformat'
import { useHistory,useParams } from "react-router-dom"
import queryString from 'query-string'
import SaveMedicalReportModal from "../SaveMedicalReportModal";
import IsNewUserModal from "../../landing/IsNewUserModal";
import MedicalReportModal from "../MedicalReportModal";

const UserAppointments = props => {
    const [users, setUsers] = useState([])

    const history = useHistory()
    const params = useParams()

    let moment = require('moment');
    const [futureAppointments, setFutureAppointments] = useState([])
    const [medicalReportOpen, setMedicalReportOpen] = useState(false)
    const [IsNewUserModalOpen, setIsNewUserModalOpen] = React.useState(false)
    const [userName,setUserName] = useState('')
    let tableRef = React.createRef();
    const [detailsOpen, setDetailsOpen] = useState(false)
    const [patientName, setPatientName] = React.useState('')
    const [patientPhoneNumber, setPatientPhoneNumber] = React.useState('')
    const [appointmentId, setAppointmentId] = React.useState(null)
    const [patientBirthDate, setPatientBirthDate] = React.useState('')

    const { showSuccess, showError } = useContext(AlertContext)

    const showMedicalReport = (id, patientName, patientBirthDate, patientPhoneNumber) => {
        setAppointmentId(id);
        setPatientName(patientName);
        setPatientPhoneNumber(patientPhoneNumber);
        setPatientBirthDate(patientBirthDate);
        setMedicalReportOpen(true);
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
            const {patientFullName,appointments} = await DoctorService.getAppointmentsByUser(params.userId)
            setPatientName(patientFullName)
            const formattedData = appointments.map(a => {
                return {
                    ...a,
                    startTime: moment(a.startTime).format('DD.MM.YYYY HH:mm')+ ' - ' +moment(a.endTime).format('HH:mm'),
                    // dateFormat(a.startTime, 'HH:MM') + ' - ' + dateFormat(a.endTime, 'HH:MM'),
                    localizedStatus: localizeStatus(a.status),
                    patientName: a.patientName || '-',
                    patientPhoneNumber: a.patientPhoneNumber || '-',
                    time_status:moment(a.startTime).isBefore(Date.now())
                }
            })
            console.log(appointments)
            setUsers(formattedData)
        } catch (err) {
            showError(err)
        }
    }
    const closeDetails = () => setDetailsOpen(false)

    const openModal = (id) => {
        setAppointmentId(id)
        setIsNewUserModalOpen(true);
    }

    const openDetailsModal = id => {
        setAppointmentId(id)
        setDetailsOpen(true)
    }


    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Container>
            <MaterialTable
                title={"История приёмов "+ patientName}
                columns={[
                    {title: 'Время', field: 'startTime',},
                        {title: 'Номер телефона', field: 'patientPhoneNumber'},
                    {title: 'Статус', field: 'localizedStatus'}
                ]}
                data={users}
                tableRef={tableRef}
                actions={[
                    rowData => ({
                        icon: 'receipt',
                        tooltip: 'Медицинское заключение',
                        onClick: (event, rowData) => openDetailsModal(rowData.id),
                        hidden: rowData.status !== 'FINISHED',
                    }),

                ]}
                options={{
                    actionsColumnIndex: -1,
                    padding: "dense",
                    pageSizeOptions: [10, 15, 20],
                    pageSize: 15
                }}
            />


            <MedicalReportModal
                open={detailsOpen}
                onClose={closeDetails}
                appointmentId={appointmentId}
            />

        </Container>
    )
}

export default UserAppointments