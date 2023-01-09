import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import './../styles/globals.css';
import Router from 'next/router';
import { useState } from 'react';
import Loader from '../components/Loader';

const App = ({ Component, pageProps }: AppProps) => {
  const [loaging, setLoading] = useState(false);

  Router.events.on('routeChangeStart', (url) => {
    setLoading(true);
  });

  Router.events.on('routeChangeComplete', (url) => {
    setLoading(false);
  });

  return (
    <SessionProvider session={pageProps.session}>
      {loaging && <Loader />}
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
