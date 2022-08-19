import '../styles/globals.css';
import '../styles/emoji-picker.css';
import type { AppProps } from 'next/app';

import { UserProvider } from '@auth0/nextjs-auth0';

import ThemeContextProvider from '../store/theme-context';

import Layout from '../components/Layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ThemeContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeContextProvider>
    </UserProvider>
  );
}

export default MyApp;
