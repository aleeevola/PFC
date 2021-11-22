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


export default function ListaFrecuentesDialog(props) {
  const classes = useStyles();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


  const [loading, setLoading] = React.useState(false);

  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(6);
  const [totalPages, setTotalPages] = React.useState(0);
  const [nombreArchivo, setNombreArchivo] = React.useState('');
  const [archivos, setArchivos] = React.useState([]);

  React.useEffect(() => {
    if (props.visible) {
      getArchivosFrecuentes();
    }
  }, [props.visible, page]);

  const pageChange = (event, value) => {
    setPage(value);
  };

  const nombreChange = (event) => {
    setNombreArchivo(event.target.value);
  };

  const buttomNombre = (event, value) => {
    if(page===1)
     getArchivosFrecuentes();
    else
      setPage(1)
  };

  const selectArchivo = (value) => {
    console.log(value);
  };

  const cerrarVentana = () => {
    props.setVisible(false)
  }

  const getArchivosFrecuentes = async () => {
    const apiurl = process.env.apiURL;
    setLoading(true)
    try {
      const response = await fetch(apiurl + "/archivosFrecuentes/porNombrePaginado?nombre=" + nombreArchivo + "&page=" + page + "&pageSize=" + pageSize, {
        method: "GET",
        mode: 'cors'
      });
      if (!response.ok) {
        setLoading(false);
        throw new Error(response.statusText);
      }
      const res = await response.json();
      setTotalPages(res.totalPages);
      setArchivos(res.content)
      setLoading(false)
    }
    catch (error) {
      console.error(error);
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
          Repositorio
        </DialogTitle>
        <DialogContent dividers>
          <div>
            <Grid container spacing={1} >
              {loading
              ?<Fade
                  in={loading}
                  style={{
                    transitionDelay: '0ms',
                    width: '20px',
                    height: '20px'
                  }}
                  unmountOnExit>
                  <CircularProgress />
                </Fade>
              : 
              <>
              <Grid container justifyContent="space-between"
                alignItems="center" className={classes.buscador}>
                <InputBase
                  className={classes.input}
                  placeholder="Nombre del archivo"
                  value={nombreArchivo}
                  onChange={nombreChange}
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={buttomNombre} color="secondary">
                  <SearchIcon />
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                <List component="li">
                  <Divider />
                  {archivos.length>0 && archivos.map((row) => (
                    <>
                      <ListItem button onClick={()=>selectArchivo(row)} >
                        <ListItemText primary={row.nombre} secondary="descipcion?" />
                      </ListItem>
                      <Divider />
                    </>
                  ))}
                </List>
              </Grid>
              <Grid item xs={12} >
                <Pagination count={totalPages} page={page} variant="outlined" shape="rounded" onChange={pageChange} />
              </Grid>
              </>
              }
              <Grid item xs={12} >
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Grid container justifyContent="space-between"
            alignItems="center" >
            <Typography variant="caption" display="block" gutterBottom>
              Seleccione un archivo para agregarlo a su pedido.
            </Typography>

            <Button autoFocus onClick={cerrarVentana}>
              Cancelar
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}
