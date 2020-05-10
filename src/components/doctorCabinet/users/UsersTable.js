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

    return (
        <Container>
            <MaterialTable
                title="Международная классификация болезней"
                columns={[
                    { title: "E-mail", field: "email", searchable: true },
                    { title: "Ф.И.О.", field: "fullName" },
                    { title: "Номер телефона", field: "phoneNumber" },
                    { title: "Дата рождения", field: "birthDate", render: data => dateFormat(data.birthDate, 'dd.mm.yyyy') },
                ]}
                data={users}
                actions={[
                    {
                        icon: 'add',
                        tooltip: 'Добавить пользователя',
                        isFreeAction: true,
                        onClick: () => openCreateModal()
                    }
                ]}
                options={{
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