import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import { Button, Grid } from '@material-ui/core';
import style from './home.module.css'


export default function Index() {
  return (
    <Container flex>
    <Container maxWidth="md" >
      <Grid container spacing={2} alignItems="center">
            <Grid item container justify="flex-start" md={8} xs={12} >
                <Typography align="center" variant="h4" component="h1" gutterBottom>
                Libreria
                </Typography>
            </Grid>
            <Grid item container justify="flex-end" md={4} xs={12}>
                <Button variant="contained" color="primary" component={Link} naked href="pedido/nuevo">Realizar pedido</Button>
            </Grid>
      </Grid>
    </Container>
    
    
  </Container>
  );
}
