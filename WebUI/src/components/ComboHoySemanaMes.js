import React, {useState} from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, withStyles } from '@material-ui/core/styles';


const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(0.5),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    
    fontSize: 14,
    padding: '2px 2px 2px 2px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    //Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);


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
      padding: theme.spacing(1),
      fontWeight: 'light',
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

export default function ComboHoySemanaMes() {
    const classes = useStyles();
    const [periodo, setPeriodo] = React.useState('Hoy');
  
    const handlePeriodo = (event) => {
      setPeriodo(event.target.value);
    };
  
    return (
<FormControl className={classes.margin}>
<InputLabel></InputLabel>
<Select
  value={periodo}
  onChange={handlePeriodo}
  className={classes.btnVerMas}
  input={<BootstrapInput />}
>
  <MenuItem value={'Hoy'}>Hoy</MenuItem>
  <MenuItem value={'Semana'}>Semana</MenuItem>
  <MenuItem value={'Mes'}>Mes</MenuItem>
</Select>
</FormControl>
    );
}