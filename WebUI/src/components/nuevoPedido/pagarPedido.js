import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from 'next/link'
import Router from 'next/router'

const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: theme.spacing(1),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
    },
}));

export default function PagarPedido(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);

    const handleNext = () => {
        getPagarEfectivo();
    };

    const handleBack = () => {
        props.back();
    };

    const [efectivo, setEfectivo] = React.useState(false);

    const handleChange = (event) => {
        setEfectivo(event.target.checked);
    };

    const handlePagar = () => {
        getPagarMercadoPago();
    };

    const getPagarMercadoPago = async () => {
        const apiurl = process.env.apiURL;
        setLoading(true);
        try {
            const response = await fetch(apiurl + "/pago/mercadoPago/" + props.idPedido, {
                method: "GET",
                mode: 'cors',
            });
            if (!response.ok)
                throw new Error(response.statusText);
            window.location.href = await response.text();
            //redirectToMercadoPago(await response.text());
        }
        catch (error) {
            console.error(error);
        }
    }

    const getPagarEfectivo = async () => {
        const apiurl = process.env.apiURL;
        setLoading(true);
        try {
            const response = await fetch(apiurl + "/pago/efectivo/" + props.idPedido, {
                method: "PUT",
                mode: 'cors',
            });
            if (!response.ok)
                throw new Error(response.statusText);
            setLoading(false);
            console.log(props);
            Router.push('/pedido/result/efectivo/?idPedido='+props.idPedido);
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <div style={{ padding: 20 }}>
            <form >
                <Backdrop className={classes.backdrop} open={loading} >
                    <CircularProgress color="primary" />
                </Backdrop>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            component="span"
                            onClick={handlePagar}
                            className={classes.button}>
                            Pagar con Mercado Pago
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={efectivo}
                                    onChange={handleChange}
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label="Pagar en efectivo"
                        />
                    </Grid>
                    <Grid item sm={12}  >
                        <Box m={2}>
                            <Button className={classes.button} onClick={handleBack}>
                                Atras
                            </Button>
                            {/* <Link href={`/pedido/result/efectivo/?idPedido=${props.idPedido}`} passHref> */}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={!efectivo}
                                    onClick={handleNext}
                                    className={classes.button} >
                                    Terminar
                                </Button>
                            {/* </Link> */}
                        </Box>
                    </Grid>
                </Grid>

            </form>
        </div>
    );
}