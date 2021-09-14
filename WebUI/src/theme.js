import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      //main: '#556cd6',
      main: '#6ED3CF',
    },
    secondary: {
      main: '#19857b',
    },
    lightgray: {
      main:'#F2F2F2',
    },
    white: {
      main:'#FFFFFF',
    },
    black: {
      main:'#000000',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
