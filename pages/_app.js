import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import { Provider } from 'next-auth/client';
import Layout from '../components/layout/Layout';
import CartState from '../context/cart/CartState';
import CategoryState from '../context/category/CategoryState';
import NextNprogress from 'nextjs-progressbar';

export default function MyApp(props) {
  const { Component, pageProps } = props;

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider session={pageProps.session}>
          <CartState>
            <CategoryState>
              <Layout>
                <NextNprogress
                  color='#5652de'
                  startPosition={0.3}
                  stopDelayMs={200}
                  height={6}
                  showOnShallow={true}
                />
                <Component {...pageProps} />
              </Layout>
            </CategoryState>
          </CartState>
        </Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
