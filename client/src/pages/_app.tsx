import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Alert } from './components/shared/notificationAlert/alert'
import { useRouter } from 'next/router'
import { Suspense, lazy, useState } from 'react';
import { SessionProvider } from 'next-auth/react';

const NavbarComponent = lazy(async () => await import('./components/shared/navbar'))
const FooterComponent = lazy(async () => await import('./components/shared/footer'))
const LoadingComponent = lazy(() => import('./components/shared/loadingSpinner'))

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const routerUrl = router.asPath.split('/')[2];

  return (
    <>
      <div className="alert-container">
        <Alert id={"default-alert"} fade={true} />
      </div>
      <SessionProvider session={session}>
        <Suspense fallback={<LoadingComponent />}>
          {isSignedIn && <NavbarComponent setIsSignedIn={setIsSignedIn} isSignedIn={isSignedIn} />}
          <Component key={routerUrl} {...pageProps} setIsSignedIn={setIsSignedIn} />
          {isSignedIn && <FooterComponent setIsSignedIn={setIsSignedIn} isSignedIn={isSignedIn} />}
        </Suspense>
      </SessionProvider >
    </>
  )
}
