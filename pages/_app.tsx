import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import './../styles/globals.css';
import Router from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';

const App = ({ Component, pageProps }: AppProps) => {
  const [loaging, setLoading] = useState(false);

  Router.events.on('routeChangeStart', (url) => {
    setLoading(true);
    pageProps.loading = true;
  });

  Router.events.on('routeChangeComplete', (url) => {
    setLoading(false);
    pageProps.loading = false;
  });

  return (
    <SessionProvider session={pageProps.session}>
      <div className='relative'>
        <Layout loading={loaging}>
          <Component {...pageProps} />
        </Layout>
      </div>
    </SessionProvider>
  );
};

export default App;
