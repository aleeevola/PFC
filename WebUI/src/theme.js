import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createTheme({
  // overrides: {
  //   MuiCssBaseline: {
  //     "@global": {
  //       body: {
  //         color: "#222",
  //         background:'#f8f8f8',
  //       },
  //     },
  //   },
  // },
  palette: {
    primary: {
      main: '#43d7ba',
      //main: '#6ED3CF',
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
      default: '#f8f8f8',
    },
  },
});

export default theme;
