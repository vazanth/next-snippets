import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
import Router from 'next/router';
import Navbar from '@/components/Navbar';
import nProgress from 'nprogress';
import '@/styles/app.css';
import 'nprogress/nprogress.css';

function MyApp({ Component, pageProps }: AppProps) {
  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);
  return (
    <UserProvider>
      <div className='bg-blue-600 w-full p-10 min-h-screen'>
        <div className='max-w-2xl mx-auto'>
          <Navbar />
          <Component {...pageProps} />
        </div>
      </div>
    </UserProvider>
  );
}

export default MyApp;
