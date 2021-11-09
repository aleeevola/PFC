import Dashboard from "./dashboardAdmin";
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import { borders } from '@material-ui/system';
import Button from '@material-ui/core/Button';
import { ButtonBase } from "@material-ui/core";
import ComboHoySemanaMes from "../../src/components/ComboHoySemanaMes";

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { useUser } from "@auth0/nextjs-auth0";


const useStyles = makeStyles((theme) => ({
  fixedHeight: {
    height: 200,
  },
  boxes: {
    padding: theme.spacing(2),
    fontWeight: 'light',
    borderRadius: '4px',
    backgroundColor: '#ffffff',
  },
  textBoxes: {
    padding: theme.spacing(3),
    fontWeight: '300',
    color: '#606060',
  },
  btnBox: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    backgroundColor: "#3dbbedb8",
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    fontWeight: 'regular',
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
    borderRadius: 2,
  },
  btnVerMas: {
    height: '26px',
    padding: 0,
    textTransform: 'none',
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: '12px',
  },
  div: {
    display: 'flex',
    justifyContent: 'space-between',
  }
}));

/*

getAllUsers = () => {
  getAllUsers()
    .then(users => {
      console.log(users)
      this.setState({users: users, numberOfUsers: users.length})
      cantUsuarios = users.length;
    });
}

*/
function createData(precio, color, tamanioHoja, tipoImpresion) {
  return { precio, color, tamanioHoja, tipoImpresion };
}

const precios = [
  createData('17', 'ESCALA DE GRISES', 'A4', 'SIMPLE'),
  createData('14', 'ESCALA DE GRISES', 'A4', 'DOBLE'),
  createData('22', 'ESCALA DE GRISES', 'A3', 'SIMPLE'),
  createData('38', 'ESCALA DE GRISES', 'A3', 'DOBLE'),
  createData('25', 'COLOR', 'A4', 'SIMPLE'),
  createData('21', 'COLOR', 'A4', 'DOBLE'),
];


export async function getStaticProps() {
    //const res = await fetch('http://localhost:8080/usuarios');
    //const usuarios = await res.json()
    const usuarios =  [
      { id: 1, nombre: 'Lucia Arias', fechaLimite: '12 ago 2020 12:30', email: 'ejemplo@gmail.com', paginas: 8, pago: 'Pagado'},
    ]  
    if (!usuarios) {
      return { notFound: true };
    }
    return { props: { 
                usuarios,
               },
            };

}

/*
        export async function getStaticProps() {
          const res = await fetch('http://localhost:8080/usuarios');
          const cantUsuarios = await res.json().data;
          return {
            props: {
              cantUsuarios,
            },     
          }
        };
*/

export default function HomeAdmin({usuarios}) {
  const classes = useStyles();
  const { user, error, isLoading} = useUser();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
if(user){
  return (
    <Dashboard>
      <>
        <Grid disableGutters container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <div>
              <Typography component="h2" variant="h6" color="inherit" className={classes.title}>
                PEDIDOS
              </Typography>
            </div>
          </Grid>
          {/* Pedidos pendientes */}
          <Grid item xs={6} md={4} lg={4}>
            <Box border={1} borderColor={'rgba(96, 96, 96, 0.3)'} className={classes.boxes}>
              <div className={classes.div}>
                <Typography component="h6" variant="h6" color="inherit">
                  PENDIENTES
                </Typography>
                <ComboHoySemanaMes></ComboHoySemanaMes>               
              </div>
              <Typography component="span" fontWeight="light" className={classes.textBoxes}>
                10 pedidos, 214 páginas
              </Typography>
              <Link button href="admin/pedidos/PENDIENTE">
              <Button className={classes.btnBox} variant="contained" size="large" color="primary">Ver pedidos pendientes</Button> 
              </Link>              
            </Box>
          </Grid>
          {/* Pedidos recibidos */}
          <Grid item xs={6} md={4} lg={4}>
            <Box border={1} borderColor={'rgba(96, 96, 96, 0.3)'} className={classes.boxes}>
              <div className={classes.div}>
                <Typography component="h2" variant="h6" color="inherit" className={classes.title}>
                  IMPRESOS
                </Typography>
                <ComboHoySemanaMes></ComboHoySemanaMes>
              </div>
              <Typography component="span" fontWeight="light" className={classes.textBoxes}>
                23 pedidos, 380 páginas
              </Typography>
              <Link button href="admin/pedidos/IMPRESO">
              <Button className={classes.btnBox} variant="contained" size="large" color="primary">Ver pedidos impresos</Button>   
              </Link>
            </Box>
          </Grid>
          <Grid item xs={6} md={4} lg={4}>
            <Box border={1} borderColor={'rgba(96, 96, 96, 0.3)'} className={classes.boxes}>
              <div className={classes.div}>
                <Typography component="h2" variant="h6" color="inherit" className={classes.title}>
                  ENTREGADOS
                </Typography>
                <ComboHoySemanaMes></ComboHoySemanaMes>
              </div>
              <Typography component="span" fontWeight="light" className={classes.textBoxes}>
                23 pedidos, 380 páginas
              </Typography>
              <Link button href="admin/pedidos/ENTREGADO">
              <Button className={classes.btnBox} variant="contained" size="large" color="primary">Ver entregados</Button>               
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <div>
              <Typography component="h2" variant="h6" color="inherit" className={classes.title}>
                ARCHIVOS FRECUENTES
              </Typography>
            </div>
          </Grid>

          {/* Impresoras */}
          <Grid item xs={6} md={4} lg={4}>
            <Box border={1} borderColor={'rgba(96, 96, 96, 0.3)'} className={classes.boxes}>
              <Typography component="h2" variant="h6" color="inherit" className={classes.title}>
                IMPRESORAS
              </Typography>
              <Typography component="span" fontWeight="light" className={classes.textBoxes}>
                3 disponibles
              </Typography>
              <Link button href="#">
                <Box><ButtonBase fontWeight="500" className={classes.btnBox}>Gestionar impresoras</ButtonBase></Box>
              </Link>
            </Box>
          </Grid>
          {/* Archivos Frecuentes */}
          <Grid item xs={6} md={4} lg={4}>
            <Box border={1} borderColor={'rgba(96, 96, 96, 0.3)'} className={classes.boxes}>
              <Typography component="h2" variant="h6" color="inherit" className={classes.title}>
                ARCHIVOS
              </Typography>
              <Typography component="span" fontWeight="light" className={classes.textBoxes}>
                1.2GB utilizado
              </Typography>
              <Link button href="#">
                <Box className={classes.btnBox}>Gestionar archivos</Box>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={6} md={4} lg={4}>
            <Box border={1} borderColor={'rgba(96, 96, 96, 0.3)'} className={classes.boxes}>
              <Typography component="h2" variant="h6" color="inherit" className={classes.title}>
                USUARIOS
              </Typography>
              <Typography component="span" fontWeight="light" className={classes.textBoxes}>
              {usuarios.length} usuarios activos
              </Typography>
              <Link button href="#">
                <Box className={classes.btnBox}>Gestionar usuarios</Box>
              </Link>
            </Box>
          </Grid>
              <Grid item xs={12} md={12} lg={12}>
                            <br/>
                            <br/>
                                <Typography component="h2" variant="h6" color="inherit"  className={classes.title}>
                                    PRECIOS
                                </Typography>
                                <br/>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="simple table">                                       
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Precio</TableCell>
                                                <TableCell align="center">Color</TableCell>
                                                <TableCell align="center">Tamaño</TableCell>
                                                <TableCell align="center">Faz</TableCell>
                                                <TableCell align="right"></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {precios.map((item) => (                                                           
                                                <TableRow>
                                                    <TableCell component="th" scope="row">
                                                        ${item.precio}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {item.color}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {item.tamanioHoja}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {item.tipoImpresion}
                                                        </TableCell>                                                   
                                                    <TableCell align="right">
                                                        <Button variant="outlined" 
                                                                onClick={async (e) => {
                                                                            const { value } = e.currentTarget                                                                            
                                                                            console.log('http://localhost:8080/archivos/');                                                       
                                                                            fetch(urlArchivo)
                                                                            .then(response => {
                                                                                response.blob().then(blob => {
                                                                                    let url = URL.createObjectURL(blob);
                                                                                    printJS(url);                                                                                               
                                                                                });
                                                                            });
                      
                              }}>Actualizar</Button></TableCell>
                                                </TableRow>                                                 
                                            ))}
                                           
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                </Grid>     
        </Grid>
      </>
    </Dashboard>
  );
}

return <a href="/api/auth/login">Login</a>;
}