import React, {useContext, useEffect, useState} from 'react'
import {
    Container
} from '@material-ui/core'
import MaterialTable from "material-table";
import CreateMkbModal from "./CreateMkbModal";
import UpdateMkbModal from "./UpdateMkbModal";
import MkbService from "../../../service/MkbService";
import {AlertContext} from "../../../context/AlertContext";
import swal from 'sweetalert';

const MkbTableOld = props => {
    const [mkbList, setMkbList] = useState([])

    const [createModalOpen, setCreateModalOpen] = useState(false)
    const [updateModalOpen, setUpdateModalOpen] = useState(false)

    const [codeToUpdate, setCodeToUpdate] = useState('')
    const [nameToUpdate, setNameToUpdate] = useState('')
    const [mkbIdToUpdate, setMkbIdToUpdate] = useState(null)

    const openCreateModal = () => setCreateModalOpen(true)
    const closeCreateModal = () => setCreateModalOpen(false)
    const openUpdateModal = () => setUpdateModalOpen(true)
    const closeUpdateModal = () => setUpdateModalOpen(false)

    const { showSuccess, showError } = useContext(AlertContext)



    const fetchData = async () => {
        try {
            const data = await MkbService.getMkbList()
            setMkbList(data)
        } catch (err) {
            showError(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const askDelete = (mkbId) => {
        swal({
            title: "Вы уверены?",
            text: "После удаления, Вам придется добавить дигноз снова!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    try {
                        await MkbService.deleteMkb(mkbId)
                        fetchData()
                        showSuccess('Запись успешно удалена!')
                    } catch (err) {
                        showError(err)
                    }
                }
            });
    }

    return (
        <Container>
            <MaterialTable
                title="Международная классификация болезней"
                columns={[
                    { title: "Код", field: "code", searchable: true },
                    { title: "Название", field: "name" },
                ]}
                data={mkbList}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Редактировать',
                        onClick: (event, rowData) => {
                            setCodeToUpdate(rowData.code)
                            setNameToUpdate(rowData.name)
                            setMkbIdToUpdate(rowData.id)
                            openUpdateModal()
                        }
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Удалить',
                        onClick: (event, rowData) => askDelete(rowData.id)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Добавить наименование',
                        isFreeAction: true,
                        onClick: () => openCreateModal()
                    }
                ]}
                options={{
                    actionsColumnIndex: -1,
                    pageSize: 10
                }}
            />
            <CreateMkbModal open={createModalOpen} onClose={closeCreateModal} onCreate={fetchData}/>
            <UpdateMkbModal open={updateModalOpen} code={codeToUpdate} name={nameToUpdate} mkbId={mkbIdToUpdate} onClose={closeUpdateModal} onUpdate={fetchData}/>
        </Container>
    )
}

export default MkbTableOld