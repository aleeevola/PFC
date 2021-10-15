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
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';


export default function NuevoArchivoDialog(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [precio, setPrecio] = React.useState(null);
  const [formato, setFormato] = React.useState(1);
  const [tamanio, setTamanio] = React.useState(1);

  React.useEffect(() => {
    getPrecio();
  }, [formato, tamanio]);

  const postNuevoArchivo = async (event) => {
    console.log("postNuevoArchivo");
    const data = new FormData();
    data.append("file", props.archivo);
    data.append("formato", formato);
    data.append("tamanio", tamanio);

    const apiurl = process.env.apiURL;

    try {
      const response = await fetch(apiurl + "/archivos/nuevo", {
        method: "POST",
        mode: 'cors',
        body: data,
      });
      if (!response.ok)
        throw new Error(response.statusText);
      props.addFile(await response.json());
      cerrarVentana();
    }
    catch (error) {
      console.error(error);
    }
  }

  const getPrecio = async () => {
    const apiurl = process.env.apiURL;
    try {
      const response = await fetch(apiurl + "/archivos/precio?numeroPaginas=" + props.numeroDePaginas + "&formato=" + formato + "&tamanio=" + tamanio, {
        method: "GET",
        mode: 'cors'
      });
      if (!response.ok)
        throw new Error(response.statusText);
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
        <DialogContent>
          <DialogContentText>
            <p>Cantidad de páginas: {props.numeroDePaginas}</p>
            {precio ? <p>Precio: <b>${precio}</b></p> : <p>No se pudo obtener el precio</p>}
          </DialogContentText>
          <div>
            <form noValidate>
              <FormControl fullWidth >
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
              <p></p>
              <FormControl fullWidth >
                <InputLabel id="demo-simple-select-label">Tamaño de hoja</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Tamaño de hoja"
                  value={tamanio}
                  required
                  onChange={(event) => setTamanio(event.target.value)}>
                  <MenuItem value={1}>A4</MenuItem>
                  <MenuItem value={2}>A3</MenuItem>
                </Select>
              </FormControl>
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={cerrarVentana}>
            Cancelar
          </Button>
          <Button onClick={postNuevoArchivo} autoFocus>
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


// const subirArchivo = async (event) => {
//   console.log("subirArchivo");
//   if (event.target.files && event.target.files[0]) {
//       const i = event.target.files[0];
//       console.log(i);
//       console.log(URL.createObjectURL(i));
//       const data = new FormData();
//       data.append("file", i);
//       data.append("idPedido", props.idPedido);
//       const apiurl = "http://localhost:8080";

//       try {
//           const response = await fetch("http://localhost:8080/archivos/agregar", {
//               method: "POST",
//               mode: 'cors',
//               body: data
//           });
//           if (!response.ok)
//               throw new Error(response.statusText);
//           const nuevoArchivo = await response.json();
//           props.addFile(nuevoArchivo);
//       }
//       catch (error) {
//           console.error(error);
//       }
//   }
// };