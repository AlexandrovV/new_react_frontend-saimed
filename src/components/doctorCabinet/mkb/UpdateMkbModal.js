import React, {useContext, useEffect, useState} from 'react'
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

const UpdateMkbModal = props => {
    const { showSuccess, showError } = useContext(AlertContext)

    const [code, setCode] = useState(props.code)
    const [name, setName] = useState(props.name)

    useEffect(() => {
        // check that props.data.status is non-empty and update statusValue
        if (props.code !== code) {
            setCode(props.code);
        }
        if (props.name !== name) {
            setName(props.name);
        }
    }, [props.code, props.name]);

    const classes = useStyles()

    const { open, onClose, mkbId, onUpdate } = props

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await MkbService.updateMkb(mkbId, code, name)
            showSuccess('Диагноз успешно изменен!')
            onUpdate()
            onClose()
        } catch (err) {
            showError(err)
        }
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>Изменение диагноза:</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Код"
                        type="text"
                        value={code}
                        fullWidth
                        onChange={e => setCode(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Название"
                        type="text"
                        value={name}
                        fullWidth
                        onChange={e => setName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Отменить
                    </Button>
                    <Button  type="submit" color="primary" variant="contained">
                        Изменить
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}


export default UpdateMkbModal