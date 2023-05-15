import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/components/signin/signin');
  }, []);
  return (
    <div>
      <Head>
        <title>Office Management System</title>
        <meta name='description' content='Office Management System v1' />
        <link rel='icon' href='/favicon.ico' />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      </Head>
    </div>
  )
}
