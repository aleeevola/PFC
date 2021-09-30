import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import LayoutCliente from '../src/layouts/layoutCliente';

const useStyles = makeStyles((theme) => ({
  imgPrincipal: {
    maxWidth: '100%',
  },
  forceWidth: {
    width: '100%',
  },
}));

export default function Index() {
  const classes = useStyles();
  const [name, setName] = React.useState('00023123');
  const handleChange = (event) => {
    setName(event.target.value);
  };
  return (
    <LayoutCliente>
        <Container  disableGutters>
            <Grid item container sm={12} >
              <Grid item sm={12} md={6} >
                <img className={classes.imgPrincipal} src={require("./../src/images/home/imagen.png")} />
              </Grid>
              <Grid item sm={12} md={6} >
                <Box m={2}>
                  <Typography align="center" variant="h4" component="h4" gutterBottom>
                    Lorem Ipsum
                  </Typography>
                  <Typography align="justify" gutterBottom >
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                  </Typography>
                </Box>
              </Grid>
              <Grid container  item margin={3} sm={12} md={12} >
                <Grid item sm={12} md={6} >
                  <Box m={2}>
                    <Button className={classes.forceWidth} fullWidth variant="contained" size="large" color="primary" component={Link} naked href="pedido/nuevo">Nuevo pedido</Button>
                  </Box>
                </Grid>
                <Grid item sm={12} md={6} >
                  <Box m={2}>
                    <FormControl className={classes.forceWidth} fullWidth variant="outlined">
                      <InputLabel htmlFor="component-outlined">Buscar mi pedido</InputLabel>
                      <OutlinedInput className={classes.forceWidth} id="component-outlined" value={name} onChange={handleChange} label="Buscar mi pedido" />
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
        </Container>
    </LayoutCliente>
  );
}
