import Dashboard from "./dashboardAdmin";
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import { borders } from '@material-ui/system';
import Button from '@material-ui/core/Button';
import { ButtonBase } from "@material-ui/core";
import ComboHoySemanaMes from "../../src/components/ComboHoySemanaMes";
import { useState, useEffect } from 'react';

import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from 'next/router';
import TablaPrecios from "../../src/components/precios/tablaPrecios";
import Cargando from '../../src/components/Cargando';


const useStyles = makeStyles((theme) => ({
  fixedHeight: {
    height: 200,
  },
  boxes: {
    padding: theme.spacing(2),
    fontWeight: 'light',
    borderRadius: '4px',
    backgroundColor: '#ffffff',
  },
  textBoxes: {
    padding: theme.spacing(3),
    fontWeight: '300',
    color: '#606060',
  },
  btnBox: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    backgroundColor: "#3dbbedb8",
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


export async function getStaticProps() {
  const apiurl = process.env.apiURL;
  const resPrecios = await fetch(apiurl + '/precios');
  const precios = await resPrecios.json()
  console.log("precios index");
  console.log(precios)

  return {
    props: {
     // usuarios,
      precios,
    },
  };

}

export default function HomeAdmin({ precios }) {
  const classes = useStyles();
  const { user, error, isLoading } = useUser();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const Router = useRouter()

  if (user) {
    return (
      <Dashboard>
        <>
          <Grid disableGutters container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <div>
                <Typography component="h2" variant="h6" color="inherit" className={classes.title}>
                  PEDIDOS
                </Typography>
              </div>
            </Grid>
            {/* Pedidos pendientes */}
            <Grid item xs={6} md={4} lg={4}>
              <Box border={1} borderColor={'rgba(96, 96, 96, 0.3)'} className={classes.boxes}>
                <div className={classes.div}>
                  <Typography component="h6" variant="h6" color="inherit">
                    PENDIENTES
                  </Typography>
                  <ComboHoySemanaMes></ComboHoySemanaMes>
                </div>
                <Typography component="span" fontWeight="light" className={classes.textBoxes}>
                  10 pedidos, 214 páginas
                </Typography>
                <Link button href="admin/pedidos/PENDIENTE">
                  <Button className={classes.btnBox} variant="contained" size="large" color="primary">Ver pedidos pendientes</Button>
                </Link>
              </Box>
            </Grid>
            {/* Pedidos recibidos */}
            <Grid item xs={6} md={4} lg={4}>
              <Box border={1} borderColor={'rgba(96, 96, 96, 0.3)'} className={classes.boxes}>
                <div className={classes.div}>
                  <Typography component="h2" variant="h6" color="inherit" className={classes.title}>
                    IMPRESOS
                  </Typography>
                  <ComboHoySemanaMes></ComboHoySemanaMes>
                </div>
                <Typography component="span" fontWeight="light" className={classes.textBoxes}>
                  23 pedidos, 380 páginas
                </Typography>
                <Link button href="admin/pedidos/IMPRESO">
                  <Button className={classes.btnBox} variant="contained" size="large" color="primary">Ver pedidos impresos</Button>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={6} md={4} lg={4}>
              <Box border={1} borderColor={'rgba(96, 96, 96, 0.3)'} className={classes.boxes}>
                <div className={classes.div}>
                  <Typography component="h2" variant="h6" color="inherit" className={classes.title}>
                    ENTREGADOS
                  </Typography>
                  <ComboHoySemanaMes></ComboHoySemanaMes>
                </div>
                <Typography component="span" fontWeight="light" className={classes.textBoxes}>
                  23 pedidos, 380 páginas
                </Typography>
                <Link button href="admin/pedidos/ENTREGADO">
                  <Button className={classes.btnBox} variant="contained" size="large" color="primary">Ver entregados</Button>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <br />
              <TablaPrecios precios={precios}></TablaPrecios>
            </Grid>
          </Grid>
        </>
      </Dashboard>
    );
  }
  if(isLoading)
  return <Cargando></Cargando>;
  return Router.push("/api/auth/login");
}