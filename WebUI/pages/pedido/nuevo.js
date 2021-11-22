import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Login from '../account/login'
import Archivos from '../../src/components/nuevoPedido/selectorArchivos'
import PagarPedido from '../../src/components/nuevoPedido/pagarPedido'
import ProgramarPedido from '../../src/components/nuevoPedido/programarPedido'
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

export default function NuevoPedido() {

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const [disabledSiguiente, SetDisableSiguiente] = React.useState(true);
  const [idPedido, SetIdPedido] = React.useState(0);


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

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return <Archivos next={handleNext} back={handleBack} idPedido={idPedido} 
        newIdPedido={value => { SetIdPedido(value); }} />;
      case 1:
        return <ProgramarPedido idPedido={idPedido} next={handleNext} back={handleBack}/>;
      case 2:
        return <PagarPedido idPedido={idPedido} next={handleNext} back={handleBack}/>;
      default:
        return 'Unknown step';
    }
  }

  return (
    <LayoutCliente>
      <Container disableGutters maxWidth="sm">
        <Grid item container sm={12}  >
          <Grid item sm={12} md={12} >
            <Box m={2}>
              <Typography align="left" gutterBottom variant="h4" component="h4">
                Nuevo Pedido 
              </Typography>
              {idPedido!='0' &&
                <Typography align="left" gutterBottom variant="body1">
                  Numero de orden #{idPedido}
                </Typography>
              }
            </Box>
          </Grid>

        </Grid>
        <Grid item sm={12} >
          <Stepper activeStep={activeStep} >
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
                <div>
                  <Grid item sm={12}>{getStepContent(activeStep)}</Grid>
                </div>
            </div>
          </div>
        </Grid>

      </Container>

    </LayoutCliente>
  );
}
