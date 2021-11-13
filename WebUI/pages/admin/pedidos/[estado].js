import { useRouter } from 'next/router';
import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { DataGrid } from '@material-ui/data-grid';
import Dashboard from '../dashboardAdmin';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';

import { useUser } from "@auth0/nextjs-auth0";

const useStyles = makeStyles((theme) => ({}));


export async function getStaticPaths() {
  const apiurl = process.env.apiURL;
  const res = await fetch(apiurl + '/pedidos')
  const pedidos = await res.json()

  const paths = pedidos.map((pedido) => ({
    params: { estado: pedido.estado },
  }))

  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const apiurl = process.env.apiURL;
  const res = await fetch(apiurl +`/pedidos/estado/${params.estado}`)
  const pedidosRes = await res.json()

      const pedidos = pedidosRes.map((pedido) => {
        const id = pedido.idPedido  
        const nombre = pedido.usuario.nombre         
        const estado = pedido.estado
        const fechaEstimadaEntrega = pedido.fechaEstimadaEntrega
    
        return {
          estado,
          nombre,
          id,
          fechaEstimadaEntrega
        }
      })

      return{ 
        props: {
          pedidos
        },
      } 
    };
    

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
        width: 215,
      },
      {
        field: " ",
        headerName: '', 
        width: 200,
        sortable: false,
        filtrable: false,
        editable: false,    
        renderCell: (cellValues) => {
          return <Button variant="outlined"  
                        color="primary"           
                          style={{ marginLeft: 16 }}
                          ><Link style={{ textDecoration: "none" }} href={`/admin/pedido/${cellValues.row.id}`}>Ir al pedido</Link></Button>;
        }
      }
    ];


export default function Pedidos({pedidos}) {
 const classes = useStyles();
 const router = useRouter()
 const { user, error} = useUser();
 const estadoTitulo = (router.asPath.substring(router.asPath.lastIndexOf("/") + 1))+'S';
 
if(user){
  return (
    <Dashboard>
    <>
    <div>
        <Typography component="h2" variant="h6" color="inherit" className={classes.title}>
        PEDIDOS {estadoTitulo}
        </Typography>
    </div>    
    <Paper>
     <div style={{ height: 600, width: '100%' }}>       
      <DataGrid
        rows={pedidos}
        columns={columns}
        pageSize={10}
      />      
    </div>
    </Paper>
    </>
    </Dashboard> 
    
  );
}
return <a href="/api/auth/login">Login</a>;
}

