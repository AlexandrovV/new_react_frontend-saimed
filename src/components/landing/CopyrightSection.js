import React from 'react'
import { Container } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => createStyles({
    section: {
        backgroundColor: '#590396',
        paddingBottom: '1.5rem',
        paddingTop: '1.5rem',
        color: 'white',
        textAlign: 'center',
        [theme.breakpoints.down('md')]:{
            paddingTop:"50px",
            width:"200vw",
        },
    },
    copyrightText: {
        fontSize: '90%',
        lineHeight: '40px',
        textTransform: 'none',
        fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
    
    }
}))

const CopyrightSection = props => {
    const classes = useStyles()

    return (
        <div className={classes.section}>
            <Container>
                <small className={classes.copyrightText}>Copyright &copy; Saimed.kz 2020</small>
            </Container>
        </div>
    )
}

export default CopyrightSection