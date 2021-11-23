import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { DataGrid } from '@material-ui/data-grid';
import Dashboard from '../dashboardAdmin';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Cargando from '../../../src/components/Cargando';
import { format } from "date-fns";

import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from 'next/router';


const useStyles = makeStyles((theme) => ({}));

const columns = [
  { field: 'id',
  headerName: 'ID',
  width: 110 },  
  {
    field: 'nombre',
    headerName: 'Nombre',
    width: 220,
  },
  {
    field: 'estado',
    headerName: 'Estado',  
    width: 150,       
  },
  {
    field: 'fechaEstimadaEntrega',
    headerName: 'Fecha estimada entrega',
    width: 230,
  },  
  {
    field: 'email',
    headerName: 'Email',
    type: 'email',
    width: 240,
  },
  {
    field: " ",
    headerName: '', 
    width: 220,
    sortable: false,
    filtrable: false,
    editable: false,    
    renderCell: (cellValues) => {
      return <Button variant="outlined"  
                    color="primary"           
                      style={{ marginLeft: 16 }}
                      ><Link style={{ textDecoration: "none" }} href={`/admin/pedido/${cellValues.row.id}`}>Ver pedido</Link></Button>;
    }
  }
];

export async function getStaticProps() {
  const apiurl = process.env.apiURL;
  const res = await fetch(apiurl + '/pedidos');
  const pedidosPendientes = await res.json();
  const pedidos = pedidosPendientes.map((pedido) => {
    const id = pedido.idPedido  
    const nombre = pedido.usuario.nombre
    const email = pedido.usuario.email
    const estado = pedido.estado  
    var date = new Date(pedido.fechaEstimadaEntrega);
    const fechaEstimadaEntrega = format(date, "dd/MM/yyyy 'a las' HH:mm");

    return {
      id,
      nombre,
      email,
      estado,
      fechaEstimadaEntrega
    }
  }) 

  return{ 
    props: {
      pedidos
    },
  } 
};



export default function Pedidos({pedidos}) {
 const classes = useStyles();
 const { user, isLoading, error} = useUser();
if(user){  
  return (
    <Dashboard>
    <>
    <div>
        <Typography component="h2" variant="h6" color="inherit" className={classes.title}>
        PEDIDOS
        </Typography>
    </div>
    <Paper>
     <div style={{ height: 600, width: '100%' }}>       
      <DataGrid
        rows={pedidos}
        columns={columns}
        pageSize={9}
      />
      
    </div>
    </Paper>
    </>
    </Dashboard>     
  );
}
if(isLoading)
return <Cargando></Cargando>;
return Router.push("/api/auth/login");
}