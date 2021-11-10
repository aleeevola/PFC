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


//import printJS from 'print-js'
//const printJS = dynamic(
//    () => dynamic(() => import('printJS').then((module) => module.printjs)),
//    { ssr: false }    
//  )

const printJS = dynamic(() => import('print-js'), {
    ssr: false
});

function createData(name, color, tamaño, faz) {
    return { name, color, tamaño, faz };
}

const rows = [
    createData('Frozen yoghurt', 'ESCALA DE GRISES', 'A4', 'SIMPLE'),
    createData('Ice cream sandwich', 'COLOR', 'A4', 'DOBLE'),
    createData('Eclair', 'COLOR', 'A4', 'DOBLE'),
    createData('Cupcake', 'ESCALA DE GRISES', 'A3', 'SIMPLE'),
];

function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
            value: "Nombre archivo",
        }),
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 275,
    },
    espacios: {
        marginLeft: theme.spacing(3),
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
  const res = await fetch(`http://localhost:8080/pedidos/${params.id}`)
   const pedido = await res.json()
console.log(pedido.archivos);
       return{ 
         props: {
           pedido
         },
       } 
     };
     
     

export default function Pedido({pedido}) {

    const [estado, setEstado] = useState(pedido.estado);
    const [estadoSiguiente, setEstadoSiguiente] = useState('');
    const [URLfile, setURLfile] = useState('');
    const [numPages, setNumPages] = useState('');

    const classes = useStyles();
    const router = useRouter()
    const { user, error, isLoading } = useUser();

     
  useEffect(() => {
    //setEstado({...pedido.estado})
    console.log('Estado: ' + estado + ', estadoSiguiente: ' + estadoSiguiente);
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
                                                <TableCell align="right">{pedido.fechaEstimadaEntrega}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                                <Card className={classes.root, classes.espacios}>
                                    <CardContent>
                                        <Typography variant="h5" component="h2">
                                            PAGADO
                                        </Typography>
                                        <Typography className={classes.pos} color="textSecondary">
                                            Pago #223414
                                        </Typography>
                                        <br/>
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            Estado pedido:
                                        </Typography>
                                        <Typography variant="h5" component="h2">
                                            {pedido.estado}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" variant="outlined" align="right" onClick={actualizarEstadoPedido}> MARCAR {estadoSiguiente} </Button>                                       
                                    </CardActions>
                                </Card>
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
                                                        <Button variant="outlined" 
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
                    </div>

                    <div style={{ height: 600, width: '100%' }}>
                   
                    </div>
                </>
            </Dashboard>

        );
    }
    return <a href="/api/auth/login">Login</a>;
}

