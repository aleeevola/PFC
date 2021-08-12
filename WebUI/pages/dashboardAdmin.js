import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import PrintIcon from '@material-ui/icons/Print';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FolderIcon from '@material-ui/icons/Folder';
import SettingsIcon from '@material-ui/icons/Settings';
import homeAdmin from './homeAdmin';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
  },  
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },  
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: "#E5E5E5",
  },
  drawerContainer: {
    overflow: 'auto',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    width: 'calc(100% - 240px)',
    flexGrow: 1,    
    padding: theme.spacing(3),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
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

export default function Dashboard({children,}) {
    const classes = useStyles();
    const fixedHeightBox = clsx(classes.box, classes.fixedHeight);

    return (      
      <div className={classes.root} >
        <CssBaseline />
        <AppBar position="fixed" color="textSecondary" className={clsx(classes.appBar)}>
          <Toolbar className={classes.toolbar} style={{display:"flex", justifyContent:"space-between"}}>            
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Dashboard
            </Typography>
            <IconButton color="inherit" edge="end">
            <Avatar>J</Avatar> 
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
        className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}          
        >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>           
              <ListItem button>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="HOME" />
              </ListItem>
              <ListItem button>
              <ListItemIcon><PrintIcon /></ListItemIcon>
              <ListItemText primary="IMPRESIONES" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><CloudUploadIcon /></ListItemIcon>
              <ListItemText primary="SUBIR ARCHIVO" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><FolderIcon /></ListItemIcon>
              <ListItemText primary="GESTIÓN ARCHIVOS" />
            </ListItem>   
            <ListItem button>
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              <ListItemText primary="CONFIGURACIÓN" />
            </ListItem>                  
          </List>          
        </div>
      </Drawer>      
        <main className={classes.content} >
        <div className={classes.appBarSpacer} />        
        <Container maxWidth="lg" className={classes.container}>
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
                <Link  >
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
                <Link  >
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
                <Link  >
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
                <Link  >
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
                <Link  >
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
                <Link  >
                  <Box className={classes.btnBox}>Gestionar impresoras</Box>                    
                </Link>                
            </Box>        
          </Grid>
        </Grid>          
        </Container>                    
        </main>        
      </div>
    );
  }