import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Copyright from '../../src/Copyright';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    children:{
        minWidth:'100%',
        padding:'0.5rem',
    },
    menu: {
        background: '#fff',
        //maxWidth: '100%',
        borderRadius: '0.625rem',
        boxShadow: '0px 5px 9.5px 0.5px rgb(0 0 0 / 8%)',
    },
    header: {
        padding: '0.5rem 0rem 0.5rem 0rem',
    },
    logo: {
        maxWidth: '10rem',
    },
}));

export default function LayoutCliente({ children }) {
    const classes = useStyles();
    return (
        <Container flex="true" disableGutters>
            <Container maxWidth="sm" disableGutters className={classes.header}>
                <Grid container spacing={1}>
                    <Grid item container justifyContent="center" md={12} xs={12}>
                        <img className={classes.logo} src={require('../images/logo.png')} />
                    </Grid>
                    <Grid item container sm={12} className={classes.menu}>
                        <main className={classes.children}>{children}</main>
                    </Grid>
                    <Grid>
                        <Copyright></Copyright>
                    </Grid>
                </Grid>
            </Container>
        </Container>
    )
}