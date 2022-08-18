import '../styles/globals.css';
import '../styles/emoji-picker.css';
import type { AppProps } from 'next/app';

import ThemeContextProvider from '../store/theme-context';
import AuthContextProvider from '../store/auth-context';

import Layout from '../components/Layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ThemeContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
