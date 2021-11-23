import { React, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import ProgramarPedido from '../nuevoPedido/programarPedido';

export default function ActualizarPrecioDialog(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [precio, setPrecio] = useState(null);
  const [nuevoPrecio, setNuevoPrecio] = useState();
  const [descripcionError, setDescripcionError] = useState(false);

  useEffect(() => {
    if (props.precio)
       setPrecio(props.precio);
  }, [props.precio]);

  const actualizarPrecio = async (event) => {
    console.log("idPrecio: " + precio.idPrecio + " nuevo precio: " + nuevoPrecio )
    console.log("Precio: " + precio.idPrecio); 
    const data = new FormData();
    data.append("idPrecio", precio.idPrecio);
    data.append("nuevoPrecio", nuevoPrecio);

    const apiurl = process.env.apiURL;

    try {
      const response = await fetch(apiurl + "/precios/actualizar", {
        method: "PATCH",
        mode: 'cors',
        body: data,
      });
      if (!response.ok)
        throw new Error(response.statusText);
      cerrarVentana();
    }
    catch (error) {
      console.error(error);
    }
  }

  const cerrarVentana = () => {
    props.setVisible(false)
  }

  return (
    <div>
      <Dialog fullWidth
        fullScreen={fullScreen}
        open={props.visible}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Actualizar precio"}
        </DialogTitle>        
        <DialogContent>
          <DialogContentText>      
            {(precio!=null)?<p>Tamaño: {props.precio.tamanioHoja}, Faz: {props.precio.tipoImpresion}, Color: {props.precio.color}</p> : <></>}
                     </DialogContentText>
          <div>
            <form noValidate>
              <Grid container spacing={2}>             
                <Grid item xs={12}>
                  <TextField fullWidth
                    id="filled-multiline-static"
                    label="Nuevo precio"
                    value={nuevoPrecio}
                    onChange={(event) => setNuevoPrecio(event.target.value)}
                    error={descripcionError}
                    multiline
                    rows={2}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={cerrarVentana}>
            Cancelar
          </Button>
          <Button onClick={actualizarPrecio} autoFocus variant="contained" color="primary" disabled={descripcionError}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}