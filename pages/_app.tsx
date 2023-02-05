import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import './../styles/globals.css';
import Router from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

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
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </Layout>
      </div>
    </SessionProvider>
  );
};

export default App;
