import React, { Fragment, useState } from 'react';
import { CardMedia, Grid, Button, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider,  DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import DatePickerModal from './DatePickerModal';

const useStyles = makeStyles(theme => createStyles({
  button: {
      fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
      fontWeight: '700',
      fontSize: '18px',
      padding: '20px 40px'
  }
}))
const DatePickSection = props => {
  const classes = useStyles();
  const [DatePickerModalOpen, setDatePickerModalOpen] = useState(false)
  const openDatePickerModal = () => setDatePickerModalOpen(true)
  const closeDatePickerModal = () => setDatePickerModalOpen(false)

    return (
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
         <Button className={classes.button} onClick={openDatePickerModal} 
         variant="contained" color="primary">
           Записаться онлайн
           </Button>
           <DatePickerModal open={DatePickerModalOpen} onClose={closeDatePickerModal}/>
        </MuiPickersUtilsProvider>
      </div>
    );
}
export default DatePickSection 
