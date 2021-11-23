import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
        margin:'0',
        background: '#F7FAFC',
    },
    fondo: {
        backgroundColor: '#F7FAFC',
        padding: '5rem 0rem',
    },
}));


export default function Cargando() {
  const classes = useStyles();
  return (
    <Box justifyContent="center" align="center" className={classes.fondo} spacing={2} >
      <CircularProgress  align="center" color="primary" spacing={2} />
      <Typography align="center" variant="h5">Cargando</Typography>
    </Box>
  );
}