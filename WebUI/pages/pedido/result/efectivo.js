import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import LayoutCliente from '../../../src/layouts/layoutCliente';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router'
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
    imgSuccess: {
        width: '20rem',
        display: 'block',
        margin: 'auto',
    },
}));

export default function PagoEfectivo(props) {
    const classes = useStyles();

    const router = useRouter();
    const id = router.query.idPedido
    const [loading, setLoading] = useState(false);
    const [idPedido, setIdPedido] = useState('');

    useEffect(() => {
        if (id) {
            console.log("hola")
            setIdPedido(id);
        }
    }, [id]);

    return (
        <LayoutCliente>
            <div style={{ padding: 20 }}>
                <form >
                    {loading
                        ? <Grid container spacing={3}
                            justifyContent="center"
                            alignItems="center">
                            <Fade in={loading}
                                style={{ transitionDelay: '0ms', }}
                                unmountOnExit>
                                <CircularProgress />
                            </Fade>
                        </Grid>
                        :
                        <Grid container spacing={3}
                            justifyContent="center"
                            alignItems="center">
                            <Grid item xs={12}>
                                <img className={classes.imgSuccess} src={require("./../../../src/images/avatares/Printer-pana.svg")} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography align="center" variant="h4" component="h4" gutterBottom>
                                    Tu pedido ser?? impreso cuando abones en el local.
                                </Typography>
                                <Typography align="center" variant="subtitle2" gutterBottom>
                                    Codigo de pedido #{idPedido}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} container spacing={3}
                                justifyContent="center"
                                alignItems="center">
                                <Link href="/" passHref>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        component="span"
                                        className={classes.button}>
                                        Volver al inicio
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    }
                </form>
            </div>
        </LayoutCliente>
    );


}