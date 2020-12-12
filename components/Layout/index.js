import React from 'react'
import Header from '../header'
import Head from 'next/head'
import { useAuth } from '../../context/AuthProvider'
import { useRouter } from 'next/router'

const MainLayout = ({ children, title, titleHeader, publicPage }) => {
  const { authState, signOut } = useAuth()
  const router = useRouter()

  if (authState.isAuthenticated && publicPage) {
    router.push('/')
  }

  return (
    <>
      <Head>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap'
          rel='stylesheet'
        />
        <title>{title}</title>
      </Head>
      <div className='grid gap-4'>
        <Header user={authState.user} title={titleHeader} />
        {children}
      </div>
    </>
  )
}

export { MainLayout }
