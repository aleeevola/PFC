import { useRouter } from 'next/router';
import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { DataGrid } from '@material-ui/data-grid';
import Dashboard from '../dashboardAdmin';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({}));


export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('http://localhost:8080/pedidos')
  const pedidos = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = pedidos.map((pedido) => ({
    params: { estado: pedido.estado },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:8080/pedidos/estado/${params.estado}`)
  const pedidosRes = await res.json()

      const pedidos = pedidosRes.map((pedido) => {
        const id = pedido.idPedido  
        const nombre = pedido.nombre         
        const estado = pedido.estado
        const fechaEstimadaEntrega = pedido.fechaEstimadaEntrega
    
        return {
          estado,
          nombre,
          id,
          fechaEstimadaEntrega
        }
      })
      console.log(pedidosRes)
      console.log(pedidos)
    
      return{ 
        props: {
          pedidos
        },
      } 
    };
    

const columns = [
  {
    field: 'nombre',
    headerName: 'Nombre',
    width: 170,
  },
  {
    field: 'estado',
    headerName: 'Estado',  
    width: 100,
    sortable: false,       
  },
  {
    field: 'fechaEstimadaEntrega',
    headerName: 'Fecha límite',
    width: 160,
  },
  {field: 'pago',
    headerName: 'Acciones',  
    width: 210,   
    sortable: false,
    renderCell: (params) => (
        <strong>              
          <Button
            variant="contained"
            color="light"
            size="small"            
          >
            Ver pedido
          </Button>
          <Button
            variant="contained"
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
    field: 'email',
    headerName: 'Email',
    type: 'email',
    width: 190,
  },
  { field: 'id_pedido',
    headerName: 'ID',
    width: 90 },  
];


export default function Pedidos({pedidos}) {
 const classes = useStyles();
 const router = useRouter()
 const estadoTitulo = (router.asPath.substring(router.asPath.lastIndexOf("/") + 1))+'S';

  return (
    <Dashboard>
    <>
    <div>
        <Typography component="h2" variant="h6" color="inherit" className={classes.title}>
        PEDIDOS {estadoTitulo}
        </Typography>
    </div>    
     <div style={{ height: 600, width: '100%' }}>
     <DataGrid
        rows={pedidos}
        columns={columns}
        pageSize={9}
      />
    </div>
    </>
    </Dashboard> 
    
  );
}

