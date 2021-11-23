import React, { Component } from 'react';
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
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';


export default function NuevoArchivoFrecuenteDialog(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [precio, setPrecio] = React.useState(null);
  const [formato, setFormato] = React.useState(1);
  const [tamanio, setTamanio] = React.useState(4);
  const [color, setColor] = React.useState(2);
  const [observaciones, setObservaciones] = React.useState('');
  const [observacionesError, setObservacionesError] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (props.visible)
      getPrecio();
  }, [formato, tamanio, color, props.numeroDePaginas]);

  React.useEffect(() => {
    if (tamanio === 5 && observaciones == '')
      setObservacionesError(true);
    else setObservacionesError(false);
  }, [tamanio, observaciones]);

  const postNuevoArchivoFrecuente = async (event) => {
    console.log("postNuevoArchivoFrecuente");
    const data = new FormData();
    data.append("idPedido", props.idPedido);

    data.append("formato", formato);
    data.append("tamanio", tamanio);
    data.append("color", color);
    data.append("observaciones", observaciones);

    data.append("idArchivoFrecuente", props.idArchivoFrecuente);

    const apiurl = process.env.apiURL;

    try {
      setLoading(true)
      const response = await fetch(apiurl + "/archivosFrecuentes/agregarAPedido", {
        method: "POST",
        mode: 'cors',
        body: data,
      });
      if (!response.ok)
        throw new Error(response.statusText);
      props.addFile(await response.json());
      setLoading(false);
      cerrarVentana();
    }
    catch (error) {
      console.error(error);
    }
  }

  const getPrecio = async () => {
    const apiurl = process.env.apiURL;
    setLoading(true)
    try {
      const response = await fetch(apiurl + "/archivos/precio?numeroPaginas=" + props.numeroDePaginas + "&formato=" + formato + "&tamanio=" + tamanio + "&color=" + color, {
        method: "GET",
        mode: 'cors'
      });
      if (!response.ok) {
        setLoading(false);
        throw new Error(response.statusText);
      }
      setLoading(false)
      setPrecio(await response.json());
    }
    catch (error) {
      setPrecio(null);
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
        <DialogContent dividers>
          <DialogContentText>
            <Typography variant={'body1'} gutterBottom>Cantidad de páginas: {props.numeroDePaginas}</Typography>
            {precio ?
              <Typography  variant={'body1'} gutterBottom>Precio: <b>${precio}</b></Typography>
              : <Typography  variant={'body1'} gutterBottom>No se pudo obtener el precio</Typography>
            }
          </DialogContentText>
          <div>
            <form noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="demo-simple-select-label">Formato</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Formato"
                      value={formato}
                      required
                      onChange={(event) => setFormato(event.target.value)}>
                      <MenuItem value={1}>SIMPLE</MenuItem>
                      <MenuItem value={2}>DOBLE</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="demo-simple-select-label">Color</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Color"
                      value={color}
                      required
                      onChange={(event) => setColor(event.target.value)}>
                      <MenuItem value={1}>COLOR</MenuItem>
                      <MenuItem value={2}>ESCALA DE GRISES</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="demo-simple-select-label">Tamaño de hoja</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Tamaño de hoja"
                      value={tamanio}
                      required
                      onChange={(event) => setTamanio(event.target.value)}>
                      <MenuItem value={1}>A1</MenuItem>
                      <MenuItem value={2}>A2</MenuItem>
                      <MenuItem value={3}>A3</MenuItem>
                      <MenuItem value={4}>A4</MenuItem>
                      <MenuItem value={5}>OTRO</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth
                    id="filled-multiline-static"
                    label="Observaciones"
                    value={observaciones}
                    onChange={(event) => setObservaciones(event.target.value)}
                    error={observacionesError}
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
          <Fade
            in={loading}
            style={{
              transitionDelay: '0ms',
              width: '20px',
              height: '20px'
            }}
            unmountOnExit>
            <CircularProgress />
          </Fade>
          <Button onClick={postNuevoArchivoFrecuente} autoFocus variant="contained" color="primary" disabled={observacionesError}>
            Agregar
          </Button>
          <Button autoFocus onClick={cerrarVentana}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
