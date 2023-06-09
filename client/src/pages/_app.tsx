import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Suspense, lazy, useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Alert } from '@/components/alert';

const NavbarComponent = lazy(async () => await import('../components/navbar'))
const FooterComponent = lazy(async () => await import('../components/footer'))
const LoadingComponent = lazy(() => import('../components/loadingSpinner'))

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
        {isSignedIn && <NavbarComponent setIsSignedIn={setIsSignedIn} />}
        <Component key={routerUrl} {...pageProps} setIsSignedIn={setIsSignedIn} />
        {isSignedIn && <FooterComponent setIsSignedIn={setIsSignedIn} />}
      </SessionProvider >
    </>
  )
}
