import { Inter } from '@next/font/google'
import Home from './home'
import SignInPage from './signInPage'
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

const inter = Inter({ subsets: ['latin'] })

export default function Index(props) {

  const { data: session, status } = useSession()
  if (status === "loading") {
    return <p>Hang on there...</p>
  }

  if (status === "authenticated") {
    return (
      <Home/>
    )
  } else {
    return (
      <SignInPage/>
    )
  }
}
