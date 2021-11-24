import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
// import { DataGrid } from '@material-ui/data-grid';
import Dashboard from '../dashboardAdmin';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import PrintIcon from '@material-ui/icons/Print';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

import { useUser } from "@auth0/nextjs-auth0";

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Cargando from '../../../src/components/Cargando';
import { format } from "date-fns";


const printJS = dynamic(() => import('print-js'), {
    ssr: false
});


const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 275,
      width: '100%',
    },
    espacios: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    margen: {
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8),
    },
    cardEstado: {
        textAlign: 'center',
        justifyContent: 'center',
        paddingRight: 0,
    },
    justifyCenter: {
        justifyContent: 'center',
    },
}));

export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await fetch('http://localhost:8080/pedidos')
    const pedidos = await res.json()
  
    // Get the paths we want to pre-render based on posts
    const paths = pedidos.map((pedido) => ({
      params: { id: pedido.idPedido.toString()},
    }))
  
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: true }
  }



export async function getStaticProps({ params }) {
  const resPedido = await fetch(`http://localhost:8080/pedidos/${params.id}`)
   const pedido = await resPedido.json()
   const resPago = await fetch(`http://localhost:8080/pago/${params.id}`)
   const pago = await resPago.json()
       return{ 
         props: {
           pedido,
           pago,
         },
       } 
     };
     
     

export default function Pedido({pedido, pago}) {
    const [estado, setEstado] = useState(pedido.estado);
    const [estadoSiguiente, setEstadoSiguiente] = useState('');


    const classes = useStyles();
    const router = useRouter()
    const { user, error, isLoading } = useUser();

    var date = new Date(pedido.fechaEstimadaEntrega);
    const fechaEstimadaEntrega = format(date, "dd/MM/yyyy 'a las' HH:mm");

  useEffect(() => {
    //setEstado({...pedido.estado})
    if(estado === 'PENDIENTE'){
        setEstadoSiguiente('IMPRESO')
    }else{
        if(estado === 'IMPRESO'){
            setEstadoSiguiente('ENTREGADO')
        }
        else(
            setEstadoSiguiente('')
        )
    }   
  });

  useEffect(() => {  
      console.log("estado: " + estado)
    },[estado]);

    const pedidoID = router.asPath.substring(router.asPath.lastIndexOf("/") + 1);

    const actualizarEstadoPedido = async (event) => {
        console.log("actualizarEstadoPedido");
        const data = new FormData();
        data.append("idPedido", pedido.idPedido);
        data.append("estado", estadoSiguiente);
        data.append("email", pedido.usuario.email);

        const apiurl = process.env.apiURL;
    
        try {
          const response = await fetch(apiurl + "/pedidos/actualizarEstado", {
            method: "PATCH",
            mode: 'cors',
            body: data,
          });
          if (!response.ok)
            throw new Error(response.statusText);
          setEstado(estadoSiguiente);          
        }
        catch (error) {
          console.error(error);
        }
      }

      const handleCancelar = async (event) => {
        setEstadoSiguiente("CANCELADO");
        actualizarEstadoPedido();
      }



    if (user) {
        return (
            <Dashboard>
                <>
                    <div>
                        <Grid container>                            
                            <Grid item xs={12} md={12} lg={12}>
                                <div>
                                    <Typography component="h2" variant="h6" color="inherit" className={classes.title}>
                                        PEDIDO #{pedidoID}
                                    </Typography>
                                </div>
                                <br/>
                            </Grid>
                            <Grid container xs={12} md={12} lg={12} spacing={2}>
                            <Grid item xs={12} md={8} lg={8}>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Detalles del cliente y pedido</TableCell>
                                                <TableCell align="right"></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow key={pedidoID}>
                                                <TableCell component="th" scope="row">
                                                    Nombre
                                                </TableCell>
                                                <TableCell align="right">{pedido.usuario.nombre}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    Mail
                                                </TableCell>
                                                <TableCell align="right">{pedido.usuario.email}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    Fecha programada de entrega
                                                </TableCell>
                                                <TableCell align="right">{fechaEstimadaEntrega}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            <Grid  item xs={12} md={4} lg={4}>
                                <Card className={classes.cardEstado}>
                                    <CardContent>
                                        {pago.metodoDePago == 'EFECTIVO' ? 
                                        <>
                                            <Typography className={classes.pos} color="textSecondary">
                                                 Pago pendiente                                                   
                                            </Typography>
                                            <Typography variant="h5" component="h2"  fontWeight='800'>
                                                EFECTIVO
                                            </Typography>                                            
                                        </> 
                                        :
                                        <>
                                            <Typography className={classes.pos} color="textSecondary">
                                                 Pago #{pago.idPago}                                                   
                                            </Typography>
                                            <Typography variant="h5" component="h2" fontWeight='500'>
                                                {pago.estadoFront}
                                            </Typography>   
                                        </>
                                        }
                                        <br/>
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            Estado pedido:
                                        </Typography>
                                        <Typography variant="h5" component="h2">
                                            {pedido.estado}
                                        </Typography>                                        
                                    </CardContent>
                                    <CardActions className={classes.justifyCenter} >
                                        {estadoSiguiente != '' ? <Button size="small" variant="contained" color="secondary" onClick={actualizarEstadoPedido}> MARCAR {estadoSiguiente} </Button> 
                                        : 
                                            <>
                                                <Button size="small" variant="outlined" href="/admin/pedidos" color="secondary"> Volver a pedidos </Button>
                                            </> }                           
                                    </CardActions>
                                </Card>
                            </Grid>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                            <br/>
                            <br/>
                                <Typography component="h2" variant="h6" color="inherit">
                                    ARCHIVOS
                                </Typography>
                                <br/>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="simple table">                                       
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Archivo</TableCell>
                                                <TableCell align="left">Observaciones</TableCell>
                                                <TableCell align="center">Color</TableCell>
                                                <TableCell align="center">Tamaño</TableCell>
                                                <TableCell align="center">Faz</TableCell>
                                                <TableCell align="right"></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {pedido.archivos.map((archivo) => (                                                           
                                                <TableRow key={archivo.idArchivo}>
                                                    <TableCell component="th" scope="row">
                                                        {archivo.nombre}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {archivo.observaciones}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {archivo.color}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {archivo.tamanioHoja}
                                                        </TableCell>
                                                    <TableCell align="center">
                                                        {archivo.tipoImpresion}
                                                        </TableCell>
                                                    <TableCell align="right">
                                                        <Button variant="outlined" color="primary"                                                                 
                                                                onClick={async (e) => {
                                                                            const { value } = e.currentTarget
                                                                            /* Importo print-js dinamicamente */
                                                                            const printJS = (await import('print-js')).default   
                                                                            const urlArchivo = 'http://localhost:8080/archivos/'+archivo.token;
                                                                            console.log(urlArchivo);                                                       
                                                                            fetch(urlArchivo)
                                                                            .then(response => {
                                                                                response.blob().then(blob => {
                                                                                    let url = URL.createObjectURL(blob);
                                                                                    printJS(url);                                                                                               
                                                                                });
                                                                            });
                      
                              }}>Imprimir</Button></TableCell>
                                                </TableRow>                                                 
                                            ))}
                                           
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <Grid container item xs={12} md={12} lg={12} justifyContent="center">
                          <Button  variant="outlined" onclick={handleCancelar}> CANCELAR PEDIDO </Button>   
                        </Grid>
                    </div>
                </>
            </Dashboard>

        );
    }
    if(isLoading)
    return <Cargando></Cargando>;
    return Router.push("/api/auth/login");
}

