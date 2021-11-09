import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { DataGrid } from '@material-ui/data-grid';
import Dashboard from '../dashboardAdmin';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Archivos from '../../../src/components/nuevoArchivoFrecuente/selectorArchivos';

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
/*
export async function getStaticProps() {
  const res = await fetch('http://localhost:8080/pedidos');
  const pedidosPendientes = await res.json();
  const pedidos = pedidosPendientes.map((pedido) => {
    const id = pedido.idPedido  
    const nombre = pedido.usuario.nombre
    const email = pedido.usuario.email
    const estado = pedido.estado  
    const fechaEstimadaEntrega = pedido.fechaEstimadaEntrega

    return {
      id,
      nombre,
      email,
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
*/


export default function ArchivosFrecuentes() {
 const classes = useStyles();
 const { user, error} = useUser();
 const [idArchivoFrecuente, SetidArchivoFrecuente] = React.useState(0);
if(user){  
  return (
    <Dashboard>
    <>
    <div>
        <Typography component="h2" variant="h6" color="inherit" className={classes.title}>
        ARCHIVOS FRECUENTES    
        </Typography>
    </div>
     <div style={{ height: 600, width: '100%' }}>

    </div>
    <Archivos idArchivoFrecuente={idArchivoFrecuente} 
        newIdArchivoFrecuente={value => { SetIdArchivoFrecuente(value); }} />
    </>
    </Dashboard> 
    
  );
}
  return <a href="/api/auth/login">Login</a>;
}