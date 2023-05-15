"use client";

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Alert } from './components/shared/notificationAlert/alert'
import { useRouter } from 'next/router'
import { Suspense, lazy, useState } from 'react';
import { SessionProvider } from 'next-auth/react';

const NavbarComponent = lazy(() => import('./components/shared/navbar/navbar'))
const FooterComponent = lazy(() => import('./components/shared/footer/footer'))
const LoadingComponent = lazy(() => import('./components/shared/loadingSpinner/loadingSpinner'))

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const routerUrl = router.asPath.split('/')[2];

  return (
    <>
      <div className='slider-thumb'></div>
      <div className="alert-container">
        <Alert id={"default-alert"} fade={true} />
      </div>
      {/* <SessionProvider session={session}> */}
      {isSignedIn &&
        <Suspense fallback={<LoadingComponent />}>
          <NavbarComponent setIsSignedIn={setIsSignedIn} />
        </Suspense>
      }
      <Component key={routerUrl} {...pageProps} setIsSignedIn={setIsSignedIn} />
      {isSignedIn &&
        <Suspense fallback={<LoadingComponent />}>
          <FooterComponent />
        </Suspense>
      }
      {/* </SessionProvider > */}
    </>
  )
}
