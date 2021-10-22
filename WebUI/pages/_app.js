import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Button, Grid } from '@material-ui/core';

import { UserProvider } from '@auth0/nextjs-auth0';

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <UserProvider>
    <React.Fragment>
      <Head>
        <title>Imprenta blabla</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Container disableGutters maxWidth={false}>
            <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </React.Fragment>
    </UserProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
