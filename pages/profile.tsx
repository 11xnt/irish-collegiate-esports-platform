import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Menu from '../components/menu'
import TeamList from '../components/teamList'
import useSWR	from 'swr';
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import PlayerForm from '../components/forms/player'

const inter = Inter({ subsets: ['latin'] })

const fetcher = (...args: [any, any]) => fetch(...args).then((res) => res.json())

export default function Profile(props) {

  const router = useRouter()
  const { data: session, status } = useSession()
  const [calledPush, setCalledPush] = useState(false)
  const [isDisplay, setDisplay] = useState(false)

  useEffect(()=>{
    if(status !== "loading"){
      if (status === "authenticated") {
        if(calledPush) return
        else{
          router.push('/profile')
          setCalledPush(true)
        }
      } else{
        router.push('/')
        setCalledPush(true)
      }
  }},[router, session])

  const { data: foundUser, error: userError } = useSWR(calledPush ? `/api/users/${session.user.id}/teams` : null, fetcher);
  if(!foundUser) return <div>Loading...</div>
  if(userError) return <div>Failed to load</div>

  if (typeof window !== "undefined" && status !== "authenticated") return null;

  if(foundUser) {
    console.log(foundUser.player)
  return (
      <>
        <Head>
          <title>Profile Page</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
        <Menu/>
          <div className={styles.container}>
          {/* row */}
          <div className={`${styles.containerItem} ${styles.containerItem1}`}>
              <div className={styles.profileImage}>
                  <Image src="/images/default_player.png" fill
                      alt=''/>
              </div>
              <div className={styles.profileSummary}>
                <h2>{foundUser.foundUser.username}</h2>
                <h3>{foundUser.foundUser.firstName} {foundUser.foundUser.lastName}</h3>
                <h3>{foundUser.player.institute.name}</h3>
                <h3>Joined: {foundUser.foundUser.createdAt}</h3>
                <h4>{"student" in session.user ? "Verified":""}</h4>
              </div>
              <br/><br/>
              <div>
                {"student" in session.user && foundUser.player != null ? <button onClick={() => setDisplay(!isDisplay)}>Become a player</button> : null}
                {isDisplay ? <PlayerForm user={session.user.email}/> : null}
              </div>
          </div>
          <div className={`${styles.containerItem} ${styles.containerItem2}`}>
            <h2>Game Accounts</h2>
            <div className={styles.gameAccounts}>
                  <div className={styles.gameAccountItem}>
                    <button
                      onClick={() => {signIn('discord');}}
                      disabled={"discord" in session.user ? true : false}
                    >Connect{"discord" in session.user ? "ed" : ""} to Discord</button>
                    </div>
                  <div className={styles.gameAccountItem}>
                    <button
                      onClick={() => {signIn('boxyhq-saml', {callbackUrl: "/profile"} );}}
                      disabled={"student" in session.user ? true : false}
                    >Connect{"student" in session.user ? "ed" : ""} Student Email</button>
                  {/* Connect{"boxyhq-saml" in session.student ? "ed" : ""}  */}
                  </div>
                  <h2 className={styles.gameAccountItem}>Steam</h2>
                  <h2 className={styles.gameAccountItem}>Epic Games</h2>
            </div>
          </div>
          <div className={`${styles.containerItem} ${styles.containerItem3}`}>
              <h2>Teams</h2>
              <div className={styles.cardRow}>
                {
                  foundUser.player.teams.length > 0 ? <TeamList teams={foundUser.player.teams}/> : <h2>No Teams Found</h2>
                }
              </div>
          </div>
        </div>
        </main>
      </>
    )
  }
}

