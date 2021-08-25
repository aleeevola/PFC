import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { DataGrid } from '@material-ui/data-grid';
import Dashboard from './dashboardAdmin';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({}));

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'nombre',
    headerName: 'Nombre',
    width: 170,
    editable: true,
  },
  {
    field: 'fechaLimite',
    headerName: 'Fecha límite',
    width: 190,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    type: 'email',
    width: 190,
    editable: true,
  },
  {
    field: 'paginas',
    headerName: 'Páginas',  
    type: 'number', 
    width: 160,    
  },
  {
    field: 'pago',
    headerName: 'Estado',  
    width: 160,       
  },
  {field: 'estado',
    headerName: ' ',  
    width: 160,   
    renderCell: (params) => (
        <strong>              
          <Button
            variant="contained"
            color="light"
            size="small"
            style={{ marginLeft: 16 }}
          >
            Imprimir
          </Button>
        </strong>
      ), 
  },
];

const rows = [
  { id: 1, nombre: 'Lucia Arias', fechaLimite: '12 ago 2020 12:30', email: 'ejemplo@gmail.com', paginas: 8, pago: 'Pagado', },
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

const renderDetailsButton = (params) => {
    return (
        <strong>
            <Button
                variant="contained"
                color="red"
                size="small"
                style={{ marginLeft: 16 }}                
            >
                More Info
            </Button>
        </strong>
    )
}

export default function Pedidos() {
 const classes = useStyles();
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
        rows={rows}
        columns={columns}
        pageSize={9}
      />
    </div>
    </>
    </Dashboard> 
    
  );
}