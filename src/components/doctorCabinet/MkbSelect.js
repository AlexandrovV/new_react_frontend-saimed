import React, { useState, useContext } from 'react'
import { useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DoctorService from '../../service/DoctorService'
import { AlertContext } from '../../context/AlertContext'
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
const useStyles = makeStyles({
    marginTop: {
        marginTop: '15px'
    }
})

const MkbSelect = props => {
    const classes = useStyles()
    const { showError } = useContext(AlertContext)

    const [mkbList, setMkbList] = useState([])

    const { selectedDiagnosis, setSelectedDiagnosis } = props

    const fetchData = async () => {
        try {
            const mkb = await DoctorService.getMkbDiagnosis()
            setMkbList(mkb)
        } catch (err) {
            showError(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <FormControl fullWidth className={classes.marginTop}>
            <Autocomplete
                id="combo-box-demo"
                options={mkbList}
                getOptionLabel={(option) => `(${option.code}) - ${option.name}`}
                onChange={(event, newValue) => {
                    setSelectedDiagnosis(newValue.id);
                }}
                renderInput={(params) => <TextField style={{ width: '100%' }}  {...params} label="Выберите дигноз"  />}
            />
        </FormControl>
    )
}

export default MkbSelect