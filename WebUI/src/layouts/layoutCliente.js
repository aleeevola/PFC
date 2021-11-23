import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Copyright from '../../src/Copyright';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';


const useStyles = makeStyles((theme) => ({
    root: {
        margin:'0',
        background: '#F7FAFC',
    },
    appbar: {
        backgroundColor: '#F7FAFC',
        boxShadow: 'none',
    },
    piedepagina: {
        backgroundColor: '#F7FAFC',
        padding: '5rem 0rem',
    },
    children: {
        minWidth: '100%',
        //padding:'0.5rem',
    },
    menu: {
        background: '#fff',
        // //maxWidth: '100%',
        // borderRadius: '0.625rem',
        // boxShadow: '0px 5px 9.5px 0.5px rgb(0 0 0 / 8%)',
    },
    header: {
        backgroundColor: '#F7FAFC',
        //padding: '0.5rem 0rem 0.5rem 0rem',
        padding: '0rem',
        margin:'0rem'
    },
    logo: {
        maxHeight: '3rem',
    },
}));

export default function LayoutCliente({ children }) {
    const classes = useStyles();
    return (
        <Container flex="true" disableGutters maxWidth={false} className={classes.header}>
            <Container disableGutters className={classes.header} maxWidth={false}>
                <Grid container >
                    <Grid container justifyContent="center" >
                        <AppBar position="static" className={classes.appbar}>
                            <Toolbar>
                                <Container maxWidth="md" >
                                    <Grid container justifyContent="space-between" alignItems="center">
                                        <Grid item >
                                            <Link href="/" passHref>
                                                <a>
                                                    <img className={classes.logo} src={require('../images/logo.svg')} />
                                                </a>
                                            </Link>
                                        </Grid>
                                        <Grid item >
                                            {/* <Button color="inherit">Realizar pedido</Button>
                                    <Button color="inherit">Buscar pedido</Button> */}
                                            <Button color="inherit" href="/precios">Precios</Button>
                                            <Button color="inherit">Ayuda</Button>
                                        </Grid>
                                    </Grid>
                                </Container>
                            </Toolbar>
                        </AppBar>
                    </Grid>
                    <Grid item container sm={12} className={classes.menu}>
                        <main className={classes.children}>{children}</main>
                    </Grid>
                    <Grid item container sm={12} justifyContent="center" alignItems="center" className={classes.piedepagina} spacing={2} >
                        <Grid item container sm={12} justifyContent="center" alignItems="center">
                            <img className={classes.logo} src={require('../images/logo.svg')} />
                        </Grid>
                        <Grid item sm={12}>
                            <Typography align="center" variant="body1">
                                San Martin 1905 - Santo Tomé
                            </Typography>
                            <Typography align="center" variant="h5" >
                                +54 342 5066420
                            </Typography>
                            <Typography align="center" variant="body1">
                                Horario de atención de 8:00 a 13:00 de Lunes a Viernes
                            </Typography>
                        </Grid>
                        <Grid item sm={12}>
                            <Copyright></Copyright>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Container>
    )
}