import '../styles/globals.css';
import '../styles/emoji-picker.css';
import type { AppProps } from 'next/app';

import ThemeContextProvider, { ThemeContext } from '../store/theme-context';

import Layout from '../components/Layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeContextProvider>
  );
}

export default MyApp;
