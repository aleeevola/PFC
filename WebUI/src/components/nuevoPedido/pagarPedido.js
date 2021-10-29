import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: theme.spacing(1),
    },
    mercadoPago:{
        backgroundColor:'#2866b8',
        height:'100px',
    }
}));

export default function PagarPedido(props) {
    const classes = useStyles();

    const handleNext = () => {
        putPagarPedido();
    };

    const handleBack = () => {
        props.back();
    };

    const [efectivo, setEfectivo] = React.useState(false);
    
      const handleChange = (event) => {
        setEfectivo(event.target.checked);
      };

    const putPagarPedido = async (event) => {
        console.log("putPagarPedido");
        const data = new FormData();
        data.append("idPedido", props.idPedido);
        data.append("fechaEntrega", parseISO(fechaEntrega).getTime());
        data.append("email", email);
        data.append("nombre", nombre);

        const apiurl = process.env.apiURL;

        try {
            const response = await fetch(apiurl + "/pedidos/programar", {
                method: "PATCH",
                mode: 'cors',
                body: data,
            });
            if (!response.ok)
                throw new Error(response.statusText);
            props.next();
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <div style={{ padding: 20 }}>
            <form >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <div className={classes.mercadoPago}></div>
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

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className={classes.button}
                            >
                                Siguiente
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}