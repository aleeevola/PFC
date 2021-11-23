import React, { Component } from 'react';
import LayoutCliente from '../../src/layouts/layoutCliente';
import { Grid, Container, Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    precios:{
      backgroundColor:'#E6F6FE',
      padding:'2rem 1rem',
      borderRadius: '10px',
    },
    boton: {
      color:'#ffff'
    },
    encambezado: {
      backgroundColor: '#F7FAFC',
      padding: '5rem 2rem',
    },
    pasoapaso: {
      padding: '3rem 2rem',
    },
    imgPrincipal: {
      maxWidth: '100%',
    },
    forceWidth: {
      width: '100%',
    },
    boton: {
        color:'#ffff',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
  }));

  export async function getStaticProps() {
      console.log("get static props");
    const apiurl = process.env.apiURL;
    const res = await fetch(apiurl + '/precios');
    const precios = await res.json();

    if (!precios) {
      return { notFound: true };
    }
    console.log("precios" + precios)
    return {
      props: {
        precios,
      },
    };  
  }  

export default function Precios(props) {
    const classes = useStyles();
console.log(props)
    return (
    <LayoutCliente>
      <Container disableGutters maxWidth="md">
      <Grid item container sm={12}  >
          <Grid item sm={12} md={12} >
            <Box m={2}>
              <Typography align="left" gutterBottom variant="h4" component="h4">
                Precios 
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" alignItems="center" className={classes.precios} spacing={2} sm={12} md={12} lg={12}>
            {props.precios.map((p) => {
                return(
              <Grid item sm={12} md={6} lg={4}>
                 <Typography align="center" variant="h6" component="h6" style={{ fontWeight: 600 }}>
                   Copia {p.tipoImpresion.toLowerCase()} faz {p.tamanioHoja}
                 </Typography>
                 <Typography align="center" variant="h6" component="h6" style={{ fontWeight: 600 }}>
                   {p.color.charAt(0)}{(p.color.slice(1).toLowerCase()).replace('_', ' ').replace('_', ' ')}
                 </Typography>
                 <Typography align="center" variant="h3" component="h3" style={{ fontWeight: 100 }}>
                   ${p.precio}
                 </Typography>
               </Grid>
                )
            }
            )}
        </Grid>
        <Grid item container sm={12}  spacing={2} justifyContent="center" >
          <Grid item sm={12} md={6} align="center" justifyContent="center"  spacing={2}  >
            <Box m={2} align="center">
            <Button  variant="contained" color="primary" href="/"  className={classes.boton} fullWidth>
                  Volver a inicio
            </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </LayoutCliente>
  );
}
