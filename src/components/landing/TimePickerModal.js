import React, { Fragment, useState } from 'react';
import Dialog from '@material-ui/core/Dialog'
import { CardMedia, Grid, Button, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider,  DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme=>({
    dialogTitle: {
        textAlign: 'center'
    },
    root: {
        width: '100%',
        minWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
      listitemtext: {
         fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
      }
}));

const TimePickerModal = props => {
    const { open, onClose } = props
    const classes = useStyles();

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setChecked(newChecked);
      };
    const [checked, setChecked] = React.useState([0]);


    return (
        <List className={classes.root}>
        {[0, 1, 2, 3].map(value => {
          const labelId = `checkbox-list-label-${value}`;
          return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <ListItem className={classes.root} key={value} role={undefined} dense button onClick={handleToggle(value)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText className={classes.listitemtext} id={labelId} primary={`09:00`} />
            </ListItem>
          <Button onClick={onClose} color="primary">
                Cancel
            </Button>
        </Dialog>
         );
        })}
      </List>
    );
}

export default TimePickerModal