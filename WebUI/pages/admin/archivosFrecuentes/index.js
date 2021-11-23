import * as React from 'react';
import { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { DataGrid } from '@material-ui/data-grid';
import Dashboard from '../dashboardAdmin';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Archivos from '../../../src/components/nuevoArchivoFrecuente/selectorArchivos';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { useUser } from "@auth0/nextjs-auth0";


const useStyles = makeStyles((theme) => ({}));

const columns = [
  { field: 'id',
  headerName: 'ID',
  width: 90 },  
  {
    field: 'nombre',
    headerName: 'Nombre',
    width: 160,
  },
  {
    field: 'estado',
    headerName: 'Estado',  
    width: 140,       
  },
  {
    field: 'fechaEstimadaEntrega',
    headerName: 'Fecha límite',
    width: 155,
  },  
  {
    field: 'email',
    headerName: 'Email',
    type: 'email',
    width: 190,
  },
  {field: 'botones',
    headerName: 'Acciones',  
    width: 210,   
    sortable: false,
    renderCell: (params) => (
        <strong>                    
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            style={{ marginLeft: 16 }}
          >
            Imprimir
          </Button>
        </strong>
      ), 
  },
  {
    field: "pedido",
    headerName: '', 
    renderCell: (cellValues) => {
      return <Link href={`/admin/pedido/${cellValues.row.id}`}>Ver pedido</Link>;
    }
  }
];

export async function getStaticProps() {
  const apiurl = process.env.apiURL;
  const res = await fetch(apiurl + '/archivosFrecuentes');
  const archivosFrecuentes = await res.json();
  const archivos = archivosFrecuentes.map((archivoF) => {
    const id = archivoF.idArchivoFrecuente      
    const nombre = archivoF.nombre
      return {
      id,
      nombre
    }
  })
  
  return{ 
    props: {
      archivos
    },
  } 
};



export default function ArchivosFrecuentes(props) {
 const classes = useStyles();
 const { user, error} = useUser();
 const [idArchivoFrecuente, SetidArchivoFrecuente] = React.useState(0);
 const [refrescarLista, setRefrescarLista] = React.useState(false);

 useEffect(() => {
   if(refrescarLista){
    //TODO
   }
 
}, [refrescarLista]);

if(user){  
  return (
    <Dashboard>
    <>
    <div>
      <Grid container xs={12} md={12} lg={12}>
        <Grid container xs={12} md={8} lg={10}>
          <Typography component="h2" variant="h6" color="inherit" className={classes.title}>
          ARCHIVOS FRECUENTES           
          </Typography>
        </Grid>
        <Grid container xs={12} md={4} lg={2}>
          <Archivos className={classes.title} idArchivoFrecuente={idArchivoFrecuente} 
          newIdArchivoFrecuente={value => { SetIdArchivoFrecuente(value); }} />
        </Grid>
      </Grid>    
        <Grid item xs={12} md={12} lg={12}>
                            <br/>                            
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="simple table">                                       
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Lista de archivos frecuentes</TableCell>    
                                                <TableCell></TableCell>                                              
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {props.archivos.map((item) => (                                                           
                                                <TableRow>
                                                    <TableCell component="th" scope="row">
                                                        {item.nombre}
                                                    </TableCell>
                                                    <TableCell align="center">                                                        
                                                    </TableCell>                                                                                                
                                                    <TableCell align="right">
                                                        <Button variant="outlined" color="secondary" 
                                                                onClick={async (e) => {                                                                 
                                                                            const { value } = e.currentTarget   
                                                                            const data = new FormData();
                                                                            data.append("idArchivoFrecuente", item.id);
                                                                            const apiurl = process.env.apiURL;
                                                                            try {
                                                                              const response = await fetch(apiurl + "/archivosFrecuentes/eliminar", {
                                                                                method: "DELETE",
                                                                                mode: 'cors',
                                                                                body: data,
                                                                              });
                                                                              if (!response.ok)
                                                                                throw new Error(response.statusText);
                                                                            }
                                                                            catch (error) {
                                                                              console.error(error);
                                                                            }  
                                                                            setRefrescarLista(true);
                                                                                                                                                       
                      
                              }}>Eliminar</Button></TableCell>
                                                </TableRow>                                                 
                                            ))}
                                           
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                </Grid> 
    </div>
    </>
    </Dashboard> 
    
  );
}
  return <a href="/api/auth/login">Login</a>;
}