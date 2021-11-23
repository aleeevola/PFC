import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LayoutCliente from '../src/layouts/layoutCliente';
import Hidden from '@material-ui/core/Hidden';
import PhoneCallbackIcon from '@material-ui/icons/PhoneCallback';
import MapIcon from '@material-ui/icons/Map';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';

const useStyles = makeStyles((theme) => ({

    precios:{
        backgroundColor:'#E6F6FE',
        padding:'2rem 1rem',
        borderRadius: '10px',
      },
    boton: {
        color: '#ffff'
    },
    encambezado: {
        backgroundColor: '#ffff',
        padding: '5rem 2rem',
    },
    pasoapaso: {
        padding: '3rem 2rem',
    },
    imgPrincipal: {
        maxWidth: '100%',
    },
    forceWidth: {
        width: '100%',
    },
}));

export default function Index() {
    const classes = useStyles();
    const [name, setName] = React.useState('00023123');
    const handleChange = (event) => {
        setName(event.target.value);
    };

    const [openEstadoPedido, setOpenEstadoPedido] = React.useState(false);

    const abrirEstado = () => {
        setOpenEstadoPedido(true)
    }

    return (
        <LayoutCliente >
            <Container disableGutters maxWidth={false} className={classes.encambezado} >
                <Container disableGutters maxWidth="sm" className={classes.precios}>
                    
                    <Grid container justifyContent="center" alignItems="center" spacing={2}>
                        <Grid item sm={2} md={2} >
                            <PhoneCallbackIcon style={{ fontSize: 60 }} />
                        </Grid>
                        <Grid item sm={10} md={10} >
                            <Typography align="left" variant="h4" component="h4" >
                                +54 342 5066420
                            </Typography>
                        </Grid>
                        <Grid item sm={2} md={2} >
                            <MapIcon style={{ fontSize: 60 }} />
                        </Grid>
                        <Grid item sm={10} md={10} >
                            <Typography align="left" variant="h4" component="h4" >
                                San Martin 1905 - Santo Tomé
                            </Typography>
                        </Grid>
                        <Grid item sm={2} md={2} >
                            <AccessAlarmsIcon style={{ fontSize: 60 }} />
                        </Grid>
                        <Grid item sm={10} md={10} >
                            <Typography align="left" variant="h4" component="h4">
                                8:00hs a 13:00hs
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>

            </Container>
        </LayoutCliente>
    );
}
