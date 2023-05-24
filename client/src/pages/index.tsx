import { Inter } from 'next/font/google'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getProviders } from 'next-auth/react'
import SignIn from './components/signin'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)

  // useEffect(() => {
  //   router.push('/components/signin/signin');
  // }, []);

  return (
    <div>
      <Head>
        <title>Office Management System</title>
        <meta name='description' content='Office Management System v1' />
        <link rel='icon' href='/favicon.ico' />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      </Head>
      <SignIn setIsSignedIn={setIsSignedIn} />
    </div>
  )
}

// export async function getServerSideProps() {
//   return {
//     props: {
//       session: await getProviders()
//     }
//   }
// }
