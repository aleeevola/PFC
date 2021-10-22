import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { format, parseISO } from 'date-fns'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

export default function ProgramarPedido(props) {
  const classes = useStyles();

  const [fechaEntrega, setFechaEntrega] = useState('');
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');

  const [fechaEntregaError, setFechaEntregaError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [nombreError, setNombreError] = useState(false);

  const [disabledSiguiente, SetDisableSiguiente] = useState(true);

  useEffect(() => {
    if (!fechaEntregaError && email != '' && nombre != ''){
      console.log("sin errores")
      SetDisableSiguiente(false);
    }
    else{
      console.log("con errores")
      SetDisableSiguiente(true);
    }
  }, [fechaEntregaError,fechaEntrega, email, nombre]);

  useEffect(() => {
    if (fechaEntrega != '') {
      const fechaActual = new Date();
      if (parseISO(fechaEntrega).getTime() < fechaActual.getTime())
        setFechaEntregaError(true);
      else
        setFechaEntregaError(false);
    }
  }, [fechaEntrega]);

  const handleNext = () => {
    putProgramarPedido();
  };

  const handleBack = () => {
    props.back();
  };

  const putProgramarPedido = async (event) => {
    console.log("putProgramarPedido");
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
            <TextField
              fullWidth
              id="datetime-local"
              label="Horario de retiro"
              type="datetime-local"
              defaultValue={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={e => setFechaEntrega(e.target.value)}
              error={fechaEntregaError}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="email"
              type="email"
              label="Correo electrónico"
              required fullWidth
              onChange={e => setEmail(e.target.value)}
              error={emailError}
              variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="name"
              type="text"
              label="Nombre y Apellido"
              required fullWidth
              onChange={e => setNombre(e.target.value)}
              error={nombreError}
              variant="outlined" />
          </Grid>
          <Grid item sm={12}  >
            <Box m={2}>
              <Button className={classes.button} onClick={handleBack}>
                Atras
              </Button>

              <Button
                disabled={disabledSiguiente}
                variant="contained"
                color="primary"
                onClick={putProgramarPedido}
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