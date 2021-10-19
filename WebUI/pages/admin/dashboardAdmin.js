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
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PrintIcon from '@material-ui/icons/Print';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FolderIcon from '@material-ui/icons/Folder';
import SettingsIcon from '@material-ui/icons/Settings';
import EventNoteIcon from '@material-ui/icons/EventNote';
import Link from 'next/link';

import { useUser } from "@auth0/nextjs-auth0";



function Copyright() {
  return (
    <Typography variant="body2" color="secondary" align="center">
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
    margin: 0,
    padding: 0,
    width: '100%',
    display: 'flex',
    background: 'rgb(229,229,229)',
    background: 'linear-gradient(0deg, rgba(229,229,229,1) 0%, rgba(255,255,255,1) 50%)',
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
    background: "#ffffff",
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
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
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
  div: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: '16px',
  },
  txtCerrarSesion: {
    justifyContent: 'center',
    alignItems: 'end',
  }

}));


export default function Dashboard({children}) {
    const classes = useStyles();
    const fixedHeightBox = clsx(classes.box, classes.fixedHeight);
    const { user, error} = useUser();

    if(user){
      return (      
      <div className={classes.root} disablegutters >
        <CssBaseline />
        <AppBar position="fixed" color="inherit" className={clsx(classes.appBar)}>
          <Toolbar className={classes.toolbar, classes.div}>  
          <Box width="drawerWidth" background="#606060">          
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              TOTAL impresión digital
            </Typography>
          </Box>
          <div className={classes.div}>
          <Typography component="span" variant="h6" color="inherit" className={classes.div} noWrap>
              {user.name}
          </Typography>
          <IconButton color="inherit" edge="end">
            <Avatar>J</Avatar> 
          </IconButton>          
          </div>            
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
            <Link href="/admin/home">   
              <ListItem button>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="HOME" />
              </ListItem>
              </Link> 
              <Link href="pedidos">
              <ListItem button >              
                <ListItemIcon><EventNoteIcon /></ListItemIcon>
                <ListItemText primary="PEDIDOS" />                 
              </ListItem>      
              </Link> 
              <Link href="#">
              <ListItem button>
                <ListItemIcon><PrintIcon /></ListItemIcon>
                <ListItemText primary="IMPRESIONES" />
              </ListItem>
              </Link>                    
            <Link href="#">
            <ListItem button>
              <ListItemIcon><CloudUploadIcon /></ListItemIcon>
              <ListItemText primary="SUBIR ARCHIVO" />
            </ListItem>
            </Link>    
            
            <ListItem button>
              <ListItemIcon><FolderIcon /></ListItemIcon>
              <ListItemText primary="GESTIÓN ARCHIVOS" />
            </ListItem>   
            <ListItem button>
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              <ListItemText primary="CONFIGURACIÓN" />
            </ListItem>                  
          </List>             
          <Typography className={classes.txtCerrarSesion}>
          <a href="/api/auth/logout">Cerrar sesion</a>  
          </Typography>       
        </div>
      </Drawer>      
        <main className={classes.content} >
        <div className={classes.appBarSpacer} />        
        <Container disableGutters maxWidth="lg" className={classes.container}>
          {children}
        </Container>
        </main>
      </div>
    );
  }
  }