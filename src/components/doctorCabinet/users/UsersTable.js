import React, {useContext, useEffect, useState} from 'react'
import {Container} from '@material-ui/core'
import MaterialTable from "material-table";
import CreateUserModal from "./CreateUserModal";
import {AlertContext} from "../../../context/AlertContext";
import DoctorService from "../../../service/DoctorService";
import dateFormat from 'dateformat'

const UsersTable = props => {
    const [users, setUsers] = useState([])

    const [createModalOpen, setCreateModalOpen] = useState(false)

    const openCreateModal = () => setCreateModalOpen(true)
    const closeCreateModal = () => setCreateModalOpen(false)
    let moment = require('moment');

    const { showSuccess, showError } = useContext(AlertContext)

    const fetchData = async () => {
        try {
            const data = await DoctorService.GetUsers()
            setUsers(data)
        } catch (err) {
            showError(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const blockUser = async (id) => {
        try {
            await DoctorService.blockUser(id)
            fetchData()
            showSuccess('Пользователь успешно заблокирован!')
        } catch (err) {
            showError(err)
        }
    }

    const unblockUser = async (id) => {
        try {
            await DoctorService.unblockUser(id)
            fetchData()
            showSuccess('Пользователь успешно разблокирован!')
        } catch (err) {
            showError(err)
        }
    }

    return (
        <Container>
            <MaterialTable
                title="Пользователи SAIMED"
                columns={[
                    { title: "E-mail", field: "email", searchable: true },
                    { title: "Ф.И.О.", field: "fullName" },
                    { title: "Номер телефона", field: "phoneNumber" },
                    { title: "Дата рождения", field: "birthDate", 
                    render:data=>
                    moment(data.birthDate).format("L")
                    //  data => dateFormat(data.birthDate, 'dd.mm.yyyy') 
                    },
                    { title: "Роль", field: "role" },
                ]}
                data={users}
                actions={[
                    dataRow => ({
                        icon: 'block',
                        tooltip: 'Заблокировать пользователя',
                        onClick: (event, rowData) => blockUser(dataRow.id),
                        hidden: dataRow.role === 'BLOCKED'
                    }),
                    dataRow => ({
                        icon: 'done',
                        tooltip: 'Разблокировать пользователя',
                        onClick: (event, rowData) => unblockUser(dataRow.id),
                        hidden: dataRow.role !== 'BLOCKED'
                    }),
                    {
                        icon: 'add',
                        tooltip: 'Добавить пользователя',
                        isFreeAction: true,
                        onClick: () => openCreateModal()
                    }
                ]}
                options={{
                    actionsColumnIndex: -1,
                    padding: "dense",
                    pageSizeOptions: [10, 15, 20, 25],
                    pageSize: 20
                }}
            />
            <CreateUserModal open={createModalOpen} onClose={closeCreateModal} onCreate={fetchData}/>
        </Container>
    )
}

export default UsersTable