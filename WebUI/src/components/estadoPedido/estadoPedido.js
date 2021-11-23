import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import Pagination from '@material-ui/lab/Pagination';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  buscador: {
    border: '0.1rem solid rgba(0, 0, 0, 0.12)',
    borderRadius: '0.5rem',
    padding: '0px 10px'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));


export default function EstadoPedidoDialog(props) {
  const classes = useStyles();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [loading, setLoading] = React.useState(false);
  const [idPedido, setIdPedido] = React.useState('');

  const [estado, setEstado] = React.useState(null);


  const idPedidoChange = (event) => {
    setIdPedido(event.target.value);
  };

  const buttomNombre = (event, value) => {
    if (idPedido != '')
      getEstadoPedido();
  };

  const cerrarVentana = () => {
    props.setVisible(false)
  }

  const getEstadoPedido = async () => {
    const apiurl = process.env.apiURL;
    setLoading(true)
    try {
      const response = await fetch(apiurl + "/pedidos/estado?idPedido=" + idPedido, {
        method: "GET",
        mode: 'cors'
      });
      if (!response.ok) {
        setLoading(false);
        setEstado("ERROR AL OBTENER EL ESTADO DEL PEDIDO")
        throw new Error(response.statusText);
      }
      const res = await response.text();
      setEstado(res);
      setLoading(false)
    }
    catch (error) {
      setLoading(false);
      setEstado("ERROR AL OBTENER EL ESTADO DEL PEDIDO")
      console.error(error);
      //throw new Error(error);
    }
  }

  return (
    <div>
      <Dialog fullWidth
        fullScreen={fullScreen}
        open={props.visible}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="customized-dialog-title">
          Estado de pedido
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} justifyContent="center"
            alignItems="center">
            <Grid container justifyContent="space-between"
              alignItems="center" className={classes.buscador}>
              <InputBase
                className={classes.input}
                placeholder="Numero de pedido"
                value={idPedido}
                type="number"
                onChange={idPedidoChange}
              />
              <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={buttomNombre} color="secondary">
                <SearchIcon />
              </IconButton>
            </Grid>
            <Grid container spacing={1} >
              {loading
                ?
                <Grid item >
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
                </Grid>
                :
                <> {estado &&
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" align="center" gutterBottom>
                      El estado de su pedido es:
                    </Typography>
                    <Typography variant="h5" align="center" gutterBottom>
                      {estado}
                    </Typography>
                  </Grid>
                  }
                </>
              }
              <Grid item xs={12} >
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={cerrarVentana}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
