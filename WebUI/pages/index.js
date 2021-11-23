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
import Hidden from '@material-ui/core/Hidden';
import EstadoPedidoDialog from '../src/components/estadoPedido/estadoPedido'
import { useEffect } from 'react';

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
}));

export default function Index() {
  const classes = useStyles();
  const [name, setName] = React.useState('00023123');
  const handleChange = (event) => {
    setName(event.target.value);
  };
  const [precios, setPrecios] = React.useState([]);
  const [precioSimpleA4, setPrecioSimpleA4] = React.useState(0);
  const [precioDobleA4, setPrecioDobleA4] = React.useState(0);
  const [precioColorA4, setPrecioColorA4] = React.useState(0);

  
  const [openEstadoPedido, setOpenEstadoPedido] = React.useState(false);

  const abrirEstado = () => {
    setOpenEstadoPedido(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      const apiurl = process.env.apiURL;
      const res = await fetch(apiurl + '/precios');
      const p = await res.json();
      setPrecios(p);
      p.map((item) => {
        if(item.color == 'ESCALA_DE_GRISES' && item.tamanioHoja == 'A4' && item.tipoImpresion == 'SIMPLE')
        setPrecioSimpleA4(item.precio);
        else{
          if(item.color == 'ESCALA_DE_GRISES' && item.tamanioHoja == 'A4' && item.tipoImpresion == 'DOBLE')
          setPrecioDobleA4(item.precio);
          else{
            if(item.color == 'COLOR' && item.tamanioHoja == 'A4' && item.tipoImpresion == 'SIMPLE')
            setPrecioColorA4(item.precio);
          }
        }
      });
    };
    fetchData();

  }, []);

  return (
    <LayoutCliente >
      <EstadoPedidoDialog 
                visible={openEstadoPedido} 
                setVisible={event => {
                    setOpenEstadoPedido(event);
                }} > </EstadoPedidoDialog>
      <Container disableGutters maxWidth={false} className={classes.encambezado} >
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item sm={12} md={12} >

            <Hidden smUp>
              {/* vista de celulu */}
              <Typography align="left" variant="h3" component="h3" style={{ fontWeight: 600 }}>
                Una solución moderna para tus <spam style={{ color: '#E82E87' }}>pedidos de impresión</spam>
              </Typography>
              <Typography align="left" variant="body1" gutterBottom >
                La forma más fácil de hacer tus impresiones
              </Typography>
            </Hidden>
            <Hidden xsDown>
              <Typography align="center" variant="h3" component="h3" style={{ fontWeight: 600 }}>
                Una solución moderna para tus
              </Typography>
              <Typography align="center" variant="h3" component="h3" style={{ fontWeight: 600 }} color="secondary">
                pedidos de impresión
              </Typography>
              <Typography align="center" variant="body1" gutterBottom >
                La forma más fácil de hacer tus impresiones
              </Typography>
            </Hidden>
          </Grid>
          <Container disableGutters maxWidth="md">
            <Grid container justifyContent="center" spacing={2} >
              <Grid item xs={12} md={4}  >
                <Button variant="contained" color="primary" href="/pedido/nuevo" fullWidth className={classes.boton}>
                  Realizar pedido
                </Button>
              </Grid>
              <Grid item xs={12} md={4} >
                <Button variant="outlined" color="secondary" href="#contained-buttons" onClick={abrirEstado} fullWidth >
                  Buscar un pedido
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Grid>

      </Container>
      <Container maxWidth="md" disableGutters spacing={1} className={classes.pasoapaso}>
        <Grid item container sm={12} spacing={4}>
          <Grid container item sm={12} md={12} justifyContent="space-between"
            alignItems="center" spacing={3}>
            <Grid item sm={12} md={5} >
              <Typography align="center" variant="h4" component="h4" gutterBottom>
                Subí tu archivo
              </Typography>
              <Typography align="center" variant="body1" gutterBottom >
                Podes seleccionar un archivo en formato .PDF de tu almacenamiento local o de tu catálogo de archivos frecuentes
              </Typography>
            </Grid>
            <Grid item sm={12} md={5} container justifyContent="center">
              <img className={classes.imgPrincipal} src={require("./../src/images/home/Paso-1.svg")} />
            </Grid>
          </Grid>
          <Grid container item sm={12} md={12} justifyContent="space-between"
            alignItems="center" spacing={3}>
            <Hidden smUp>
              <Grid item sm={12} md={5} container justifyContent="center">
                <Typography align="center" variant="h4" component="h4" gutterBottom>
                  Elegí las opciones
                </Typography>
                <Typography align="center" variant="body1" gutterBottom >
                  Podes elegir el tipo de impresión, color y papel
                </Typography>
              </Grid>
              <Grid item sm={12} md={5} container justifyContent="center">
                <img className={classes.imgPrincipal} src={require("./../src/images/home/Paso-2.svg")} />
              </Grid>
            </Hidden>
            <Hidden xsDown>
              <Grid item sm={12} md={5} container justifyContent="center">
                <img className={classes.imgPrincipal} src={require("./../src/images/home/Paso-2.svg")} />
              </Grid>
              <Grid item sm={12} md={5} >
                <Typography align="center" variant="h4" component="h4" gutterBottom>
                  Elegí las opciones
                </Typography>
                <Typography align="center" variant="body1" gutterBottom >
                  Podes elegir el tipo de impresión, color y papel
                </Typography>
              </Grid>
            </Hidden>
          </Grid>
          <Grid container item sm={12} md={12} justifyContent="space-between"
            alignItems="center" spacing={3}>
            <Grid item sm={12} md={5} >
              <Typography align="center" variant="h4" component="h4" gutterBottom>
                Retiralo
              </Typography>
              <Typography align="center" variant="body1" gutterBottom >
                Retiras tu impresión pagando desde la web o en el local
              </Typography>
            </Grid>
            <Grid item sm={12} md={5} container justifyContent="center">
              <img className={classes.imgPrincipal} src={require("./../src/images/home/Paso-3.svg")} />
            </Grid>
          </Grid>

          {/* TODO: PRECIOS  */}
          <Grid container item sm={12} md={12} justifyContent="space-between"
            alignItems="center" spacing={3}>
            <Grid item sm={12} md={12} >
              <Typography align="center" variant="h4" component="h4" style={{ fontWeight: 600 }}>
                Precios
              </Typography>
            </Grid>
            <Grid  container justifyContent="center" alignItems="center" className={classes.precios} spacing={2}>
              <Grid item sm={12} md={3}>
                <Typography align="center" variant="h6" component="h6" style={{ fontWeight: 600 }}>
                  Copia simple A4
                </Typography>
                <Typography align="center" variant="h3" component="h3" style={{ fontWeight: 100 }}>
                  ${precioSimpleA4}
                </Typography>
              </Grid>
              <Grid item sm={12} md={3}>
                <Typography align="center" variant="h6" component="h6" style={{ fontWeight: 600 }}>
                  Copia doble faz A4
                </Typography>
                <Typography align="center" variant="h3" component="h3" style={{ fontWeight: 100 }}>
                  ${precioDobleA4}
                </Typography>
              </Grid>
              <Grid item sm={12} md={3}>
                <Typography align="center" variant="h6" component="h6" style={{ fontWeight: 600 }}>
                  Copia color A4
                </Typography>
                <Typography align="center" variant="h3" component="h3" style={{ fontWeight: 100 }}>
                  ${precioColorA4}
                </Typography>
              </Grid>
              <Grid item sm={12} md={3}>
                <Button variant="contained" color="primary" href="/precios"  className={classes.boton} fullWidth>
                  Ver mas precios
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </LayoutCliente>
  );
}

export async function getStaticProps() {
  const apiurl = process.env.apiURL;
  const res = await fetch(apiurl + '/precios');
  const precios = await res.json()
  if (!precios) {
    return { notFound: true };
  }
  return {
    props: {
      precios,
    },
  };  
}