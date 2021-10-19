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

import { useUser } from "@auth0/nextjs-auth0";


const useStyles = makeStyles((theme) => ({
  fixedHeight: {
    height: 200,
  },
  boxes: {
    padding: theme.spacing(2),
    fontWeight: 'light',
    borderRadius: 1,
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
    backgroundColor: "#6ED3CF",
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
  const { user, error} = useUser();
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
              <Link button href="pedidos/PENDIENTE">
              <Box><ButtonBase className={classes.btnBox}>Ver pedidos pendientes</ButtonBase></Box>
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
              <Link button href="pedidos/IMPRESO">
                <Box><ButtonBase className={classes.btnBox}>Ver pedidos impresos</ButtonBase></Box>
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
              <Link button href="pedidos/ENTREGADO">
                <Box><ButtonBase className={classes.btnBox}>Ver pedidos entregados</ButtonBase></Box>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <div>
              <Typography component="h2" variant="h6" color="inherit" className={classes.title}>
                UTILIDADES
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
          <Grid item xs={6} md={12} lg={12}>
            <Box border={1} borderColor={'rgba(96, 96, 96, 0.3)'} className={classes.boxes}>
              <Typography component="h2" variant="h6" color="inherit" className={classes.title}>
                ESTADÍSTICAS
              </Typography>
              <Typography component="p" className={classes.boxes}>
                $22516.00 recibidos
              </Typography>
              <Link button href="#">
                <Box className={classes.btnBox}>Ver estadísticas</Box>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </>
    </Dashboard>
  );
}

return <a href="/api/auth/login">Login</a>;
}