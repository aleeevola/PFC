import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { DataGrid } from '@material-ui/data-grid';
import Dashboard from '../dashboardAdmin';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { useUser } from "@auth0/nextjs-auth0";


const useStyles = makeStyles((theme) => ({}));

const columns = [
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

export async function getStaticProps() {
  const res = await fetch('http://localhost:8080/pedidos');
  const pedidosPendientes = await res.json();
  const pedidos = pedidosPendientes.map((pedido) => {
    const id = pedido.idPedido  
    const nombre = pedido.nombre
    const estado = pedido.estado  
    const fechaEstimadaEntrega = pedido.fechaEstimadaEntrega

    return {
      id,
      nombre,
      estado,
      fechaEstimadaEntrega
    }
  })
  console.log(pedidosPendientes)
  console.log(pedidos)
  const pedidos2 = [
    { id: 1, nombre: 'Lucia Arias', fechaLimite: '12 ago 2020 12:30', email: 'ejemplo@gmail.com', paginas: 8, pago: 'Pagado'},
    { id: 2, nombre: 'Germán Perez', fechaLimite: '12 ago 2020 15:00', email: 'ejemplo@gmail.com', paginas: 150, pago: 'Pagado'},
    { id: 3, nombre: 'Cristian Roldán', fechaLimite: '12 ago 2020 15:30', email: 'ejemplo@gmail.com', paginas: 63, pago: 'Adeuda'},
    { id: 4, nombre: 'Lucia Correa', fechaLimite: '12 ago 2020 12:30', email: 'ejemplo@gmail.com', paginas: 15, pago: 'Adeuda'},
    { id: 5, nombre: 'Camila Rodriguez', fechaLimite: '12 ago 2020 12:30', email: 'ejemplo@gmail.com', paginas: 20, pago: 'Pagado'},
    { id: 6, nombre: 'Alejandro Acosta', fechaLimite: '12 ago 2020 17:00', email: 'ejemplo@gmail.com', paginas: 55, pago: 'Adeuda'},
    { id: 7, nombre: 'José Romero', fechaLimite: '12 ago 2020 15:30', email: 'ejemplo@gmail.com', paginas: 640, pago: 'Pagado'},
    { id: 8, nombre: 'Julieta Fernandez', fechaLimite: '12 ago 2020 12:30', email: 'ejemplo@gmail.com', paginas: 5, pago: 'Pagado'},
    { id: 9, nombre: 'Pedro Gomez', fechaLimite: '13 ago 2020 12:30', email: 'ejemplo@gmail.com', paginas: 20, pago: 'Pagado'},
    { id: 10, nombre: 'Cristian Roldán', fechaLimite: '12 ago 2020 15:30', email: 'ejemplo@gmail.com', paginas: 63, pago: 'Adeuda'},
    { id: 11, nombre: 'Lucia Correa', fechaLimite: '12 ago 2020 12:30', email: 'ejemplo@gmail.com', paginas: 15, pago: 'Adeuda'},
    { id: 12, nombre: 'Camila Rodriguez', fechaLimite: '12 ago 2020 12:30', email: 'ejemplo@gmail.com', paginas: 20, pago: 'Pagado'},
    { id: 13, nombre: 'Alejandro Acosta', fechaLimite: '12 ago 2020 17:00', email: 'ejemplo@gmail.com', paginas: 55, pago: 'Adeuda'},
    { id: 14, nombre: 'José Romero', fechaLimite: '12 ago 2020 15:30', email: 'ejemplo@gmail.com', paginas: 640, pago: 'Pagado'},
    { id: 15, nombre: 'Julieta Fernandez', fechaLimite: '12 ago 2020 12:30', email: 'ejemplo@gmail.com', paginas: 5, pago: 'Pagado'},
    { id: 16, nombre: 'Pedro Gomez', fechaLimite: '13 ago 2020 12:30', email: 'ejemplo@gmail.com', paginas: 20, pago: 'Pagado'},
  ];

  return{ 
    props: {
      pedidos
    },
  } 
};



export default function Pedidos({pedidos}) {
 const classes = useStyles();
 const { user, error} = useUser();
if(user){  
  return (
    <Dashboard>
    <>
    <div>
        <Typography component="h2" variant="h6" color="inherit" className={classes.title}>
        PEDIDOS PENDIENTES
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
}