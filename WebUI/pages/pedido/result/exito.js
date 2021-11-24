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
        width: '5rem',
        display: 'block',
        margin: 'auto',
    },
}));

export default function PagoExito(props) {
    const classes = useStyles();

    const [loading, setLoading] = useState(true);
    const [idPedido, setIdPedido] = useState(null);
    const [preferenceId, setPreferenceId] = useState(null);

    const router = useRouter();
    const { payment_id, status, external_reference, comerciante_order_id, preference_id } = router.query

    console.log("preference_id: " + preference_id);
    //setPreferenceId(preference_id);

    useEffect(() => {
        console.log("hola")
        if (preference_id) {
            getPedido(preference_id);
        }
    }, [preference_id]);

    // PagoExito.getInitialProps = async () => {
    //     return {};
    //   };

    const getPedido = async (token) => {
        const apiurl = process.env.apiURL;
        try {
            const data = new FormData();
            data.append("token", token);
            data.append("estadoFront", 1);

            const response = await fetch(apiurl + "/pago/mercadoPago/callBackFront", {
                method: "PUT",
                mode: 'cors',
                body: data,
            });
            if (!response.ok)
                throw new Error(response.statusText);
            else {
                setIdPedido(await response.text());
                setLoading(false);
            }
        }
        catch (error) {
            console.error(error);
        }
    }

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
                                <img className={classes.imgSuccess} src={require("./../../../src/images/pago/success.svg")} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography align="center" variant="h4" component="h4" gutterBottom>
                                    ¡Pago exitoso!
                                </Typography>
                                <Typography align="center" variant="body1" gutterBottom>
                                    Puedes seguir el estado de tu pedido haciendo click <a href="/">aqui</a>
                                </Typography>
                                <Typography align="center" variant="subtitle2" gutterBottom>
                                    Codigo de pedido #{idPedido}
                                </Typography>
                            </Grid>
                            <Link href="/" passHref>
                                <Grid item xs={12} container spacing={3}
                                    justifyContent="center"
                                    alignItems="center">
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        component="span"
                                        className={classes.button}>
                                        Volver al inicio
                                    </Button>
                                </Grid>
                            </Link>
                        </Grid>
                    }
                </form>
            </div>
        </LayoutCliente>
    );


}