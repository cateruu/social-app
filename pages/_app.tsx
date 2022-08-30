import '../styles/globals.css';
import '../styles/emoji-picker.css';
import type { AppProps } from 'next/app';

import { UserProvider } from '@auth0/nextjs-auth0';
import ThemeContextProvider from '../app/theme-context';
import { Provider } from 'react-redux';
import { store } from '../app/store';

import Layout from '../components/Layout/Layout';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ThemeContextProvider>
        <Provider store={store}>
          <Layout>
            <Head>
              <link rel='shortcut icon' href='/favicon.png' />
            </Head>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </ThemeContextProvider>
    </UserProvider>
  );
}

export default MyApp;
