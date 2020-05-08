import React, { useContext } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { AlertContext } from '../../../context/AlertContext'
import MkbService from "../../../service/MkbService"

const useStyles = makeStyles({
    dialogTitle: {
        textAlign: 'center'
    }
})

const CreateMkbModal = props => {
    const { showSuccess, showError } = useContext(AlertContext)

    const [code, setCode] = React.useState('')
    const [name, setName] = React.useState('')

    const classes = useStyles()

    const { open, onClose, onCreate } = props

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await MkbService.saveMkb(code, name)
            showSuccess('Диагноз успешно добавлен!')
            onCreate()
            onClose()
        } catch (err) {
            showError(err)
        }
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>Добавление диагноза:</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Код"
                        type="text"
                        fullWidth
                        onChange={e => setCode(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Название"
                        type="text"
                        fullWidth
                        onChange={e => setName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Отменить
                    </Button>
                    <Button  type="submit" color="primary" variant="contained">
                        Создать
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}


export default CreateMkbModal