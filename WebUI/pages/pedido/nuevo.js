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
  root: {
    //maxWidth:'xs',
    //background: '#f8f8f8',
  },
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

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Archivos />;
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

export default function NuevoPedido() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  // const isStepOptional = (step) => {
  //   return step === 1;
  // };

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

  const handleSkip = () => {
    // if (!isStepOptional(activeStep)) {
    //   // You probably want to guard against something like this,
    //   // it should never occur unless someone's actively trying to break something.
    //   throw new Error("You can't skip a step that isn't optional.");
    // }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <LayoutCliente>
      <Container disableGutters>
        <Grid item container sm={12}  >

          <Grid item sm={12} md={12} >
            <Box m={2}>
              <Typography align="justify" gutterBottom variant="h4" component="h4">
                Nuevo Pedido
              </Typography>
              <Typography align="justify" gutterBottom >
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </Typography>
            </Box>
          </Grid>

        </Grid>
        <Grid item  sm={12} >
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              // if (isStepOptional(index)) {
              //   labelProps.optional = <Typography variant="caption">Optional</Typography>;
              // }
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
                  <Grid item  sm={12}>{getStepContent(activeStep)}</Grid>

                  <Grid item  sm={12}  >
                    <Box m={2}>
                    <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                      Atras
                    </Button>

                    <Button
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