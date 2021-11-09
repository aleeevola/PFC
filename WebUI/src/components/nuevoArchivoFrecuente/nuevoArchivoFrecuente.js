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

export default function NuevoArchivoFrecuenteDialog(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [descripcion, setDescripcion] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcionError, setDescripcionError] = useState(false);

  useEffect(() => {
    if (props.archivo)
       setNombre(props.archivo.name);
  }, [props.archivo]);

  console.log(props);
  console.log(props.archivo);
  const postNuevoArchivoFrecuente = async (event) => {
    console.log("postNuevoArchivoFrecuente");
    const data = new FormData();
    data.append("idArchivoFrecuente", props.idArchivoFrecuente);
    data.append("file", props.archivo);
    data.append("descripcion", descripcion);

    const apiurl = process.env.apiURL;

    try {
      const response = await fetch(apiurl + "/archivosFrecuentes/nuevo", {
        method: "POST",
        mode: 'cors',
        body: data,
      });
      if (!response.ok)
        throw new Error(response.statusText);
    console.log("postNuevoArchivoFrecuente antes de addfile");
    //  props.addFile(await response.json());
    //  console.log("postNuevoArchivoFrecuente despues de addfile");
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
          {"Nuevo archivo"}
        </DialogTitle>        
        <DialogContent>
          <DialogContentText>
            <p>{nombre}</p>         
            <p>Cantidad de páginas: {props.numeroDePaginas}</p>
          </DialogContentText>
          <div>
            <form noValidate>
              <Grid container spacing={2}>             
                <Grid item xs={12}>
                  <TextField fullWidth
                    id="filled-multiline-static"
                    label="Descripcion"
                    value={descripcion}
                    onChange={(event) => setDescripcion(event.target.value)}
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
          <Button onClick={postNuevoArchivoFrecuente} autoFocus variant="contained" color="primary" disabled={descripcionError}>
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}