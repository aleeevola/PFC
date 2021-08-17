import Dashboard from "./dashboardAdmin";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { borders } from '@material-ui/system';


const useStyles = makeStyles((theme) => ({
  fixedHeight: {
    height: 200,
  },
  boxes: {
    padding: theme.spacing(2),
    fontWeight: 'light',
  },
  btnBox: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'rgba(196, 196, 196, 0.3)',
    color: 'rgba(96, 96, 96, 1)',
    fontFamily: 'Roboto',
    fontWeight: 'regular',    
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
    }));

export default function HomeAdmin() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return(
        <>
        <Grid container spacing={3}>
          {/* Pedidos recibidos */}
          <Grid item xs={6} md={4} lg={4}>       
            <Box border={1} borderColor={'rgba(96, 96, 96, 0.3)'} className={ classes.boxes}>
              <Typography component="h2" variant="h6" color="inherit" className={classes.title}>
                PEDIDOS RECIBIDOS
              </Typography>
              <Typography  component="p" color="#606060" className={classes.boxes}>
                23 pedidos, 380 páginas
              </Typography>                
                <Link button href="#">
                  <Box className={classes.btnBox}>Ver todos los pedidos</Box>                    
                </Link>                
            </Box>        
          </Grid>
          {/* Pedidos pendientes */}
          <Grid item xs={6} md={4} lg={4}>       
            <Box border={1} borderColor={'rgba(96, 96, 96, 0.3)'}  className={ classes.boxes}>
              <Typography component="h2" variant="h6" color="inherit" className={classes.title}>
                PEDIDOS PENDIENTES
              </Typography>
              <Typography component="p" color="#606060" className={classes.boxes}>
                10 pedidos, 214 páginas
              </Typography>                
                <Link button href="#">
                  <Box className={classes.btnBox}>Ver pedidos pendientes</Box>                    
                </Link>                
            </Box>        
          </Grid>
          {/* Archivos Frecuentes */}
          <Grid item xs={6} md={4} lg={4}>       
            <Box border={1} borderColor={'rgba(96, 96, 96, 0.3)'}  className={ classes.boxes}>
              <Typography component="h2" variant="h6" color="inherit" className={classes.title}>
                ARCHIVOS FRECUENTES
              </Typography>
              <Typography component="p" color="#606060" className={classes.boxes}>
                Espacio utilizado: 1.2GB
              </Typography>                
                <Link button href="#">
                  <Box className={classes.btnBox}>Gestionar archivos</Box>                    
                </Link>                
            </Box>        
          </Grid>
          <Grid item xs={6} md={4} lg={4}>       
            <Box border={1} borderColor={'rgba(96, 96, 96, 0.3)'}  className={ classes.boxes}>
              <Typography component="h2" variant="h6" color="inherit" className={classes.title}>
                ESTADÍSTICAS
              </Typography>
              <Typography component="p" color="#606060" className={classes.boxes}>
                $22516.00 recibidos
              </Typography>                
                <Link button href="#">
                  <Box className={classes.btnBox}>Ver estadísticas</Box>                    
                </Link>                
            </Box>        
          </Grid>
          <Grid item xs={6} md={4} lg={4}>       
            <Box border={1} borderColor={'rgba(96, 96, 96, 0.3)'}  className={ classes.boxes}>
              <Typography component="h2" variant="h6" color="inherit" className={classes.title}>
                USUARIOS
              </Typography>
              <Typography component="p" color="#606060" className={classes.boxes}>
                5 usuarios activos
              </Typography>                
                <Link button href="#">
                  <Box className={classes.btnBox}>Gestionar usuarios</Box>                    
                </Link>                
            </Box>        
          </Grid>
          <Grid item xs={6} md={4} lg={4}>       
            <Box border={1} borderColor={'rgba(96, 96, 96, 0.3)'}  className={ classes.boxes}>
              <Typography component="h2" variant="h6" color="inherit" className={classes.title}>
                IMPRESORAS
              </Typography>
              <Typography component="p" color="#606060" className={classes.boxes}>
                3 disponibles
              </Typography>                
                <Link button href="#">
                  <Box className={classes.btnBox}>Gestionar impresoras</Box>                    
                </Link>                
            </Box>        
          </Grid>
        </Grid>        
      </>
    )
}