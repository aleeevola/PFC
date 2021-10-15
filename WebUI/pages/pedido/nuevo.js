import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Login from '../account/login'
import Archivos from './selectorArchivos'
import LayoutCliente from '../../src/layouts/layoutCliente';
import { Grid, Container } from '@material-ui/core';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Seleccionar Archivos', 'Programar pedido', 'Pagar'];
}

export default function NuevoPedido({ pedido }) {

  console.log(pedido);

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const [disabledSiguiente, SetDisableSiguiente] = React.useState(true);
  const [archivos, SetArchivos] = React.useState([]);

  React.useEffect(() => {
    if (archivos.length > 0)
      SetDisableSiguiente(false);
  }, [archivos]);
  
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return <Archivos idPedido={pedido.idPedido} archivos={archivos}
          addFile={value => {SetArchivos([...archivos, value]); }} />;
      case 1:
        return 'Pedido';
      case 2:
        return 'This is the bit I really care about!';
      case 3:
        return 'Pagar!';
      default:
        return 'Unknown step';
    }
  }

  return (
    <LayoutCliente>
      <Container disableGutters>
        <Grid item container sm={12}  >
          <Grid item sm={12} md={12} >
            <Box m={2}>
              <Typography align="justify" gutterBottom variant="h4" component="h4">
                Nuevo Pedido #{pedido.idPedido}
              </Typography>
            </Box>
          </Grid>

        </Grid>
        <Grid item sm={12} >
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Grid>
        <Grid item sm={12}  >
          <div className={classes.root, classes.componente}>
            <div>
              {activeStep === steps.length ? (
                <div>
                  <Typography className={classes.instructions}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Button onClick={handleReset} className={classes.button}>
                    Reset
                  </Button>
                </div>
              ) : (
                <div>
                  <Grid item sm={12}>{getStepContent(activeStep)}</Grid>

                  <Grid item sm={12}  >
                    <Box m={2}>
                      <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                        Atras
                      </Button>

                      <Button
                        disabled={disabledSiguiente}
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Terminar' : 'Siguiente'}
                      </Button>
                    </Box>
                  </Grid>
                </div>
              )}
            </div>
          </div>
        </Grid>

      </Container>

    </LayoutCliente>
  );
}

export async function getStaticProps() {
  //TODO: Remplazar por el usuario en el settings
  const settings = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ idUsuario: "0" })
  };
  const res = await fetch('http://localhost:8080/pedidos/iniciar', settings)
  const pedido = await res.json()
  return {
    props: {
      pedido,
    },
  }
}