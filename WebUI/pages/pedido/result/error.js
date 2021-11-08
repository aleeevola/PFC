import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LayoutCliente from '../../../src/layouts/layoutCliente';
import Typography from '@material-ui/core/Typography';
import PagarPedido from '../../../src/components/nuevoPedido/pagarPedido'
import { useRouter } from 'next/router'
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    imgError: {
        maxWidth: '5rem',
        display: 'block',
        margin: 'auto',
    },
}));

export default function PagoError(props) {
    const classes = useStyles();

    const [loading, setLoading] = useState(true);
    const [idPedido, setIdPedido] = useState(null);
    const [preferenceId, setPreferenceId] = useState(null);

    const router = useRouter();
    const { payment_id, status, external_reference, comerciante_order_id, preference_id } = router.query

    console.log("preference_id: " + preference_id);
    //setPreferenceId(preference_id);

    useEffect(() => {
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
            data.append("estadoFront", 3);

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
                                <img className={classes.imgError} src={require("./../../../src/images/pago/error.svg")} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography align="center" variant="h4" component="h4" gutterBottom>
                                    ¡Error en el pago!
                                </Typography>
                            </Grid>
                            <Grid item xs={12} >
                                <PagarPedido idPedido={idPedido}  />
                            </Grid>
                        </Grid>
                    }
                </form>
            </div>
        </LayoutCliente>
    );

}