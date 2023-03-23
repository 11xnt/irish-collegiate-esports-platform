import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Menu from '../components/menu'
import TeamList from '../components/teamList'
import useSWR	from 'swr';
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

const fetcher = (...args: [any, any]) => fetch(...args).then((res) => res.json())

export default function Profile(props) {

  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(()=>{
    if(status !== "loading"){
      if (status === "authenticated") {
        router.push('/teams')
      }else{
        router.push('/')
      }
  }},[router,session])

  const { data, error } = useSWR('/api/home/recommend', fetcher);

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>


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
              <h2>11xnt</h2>
              <h3>Allen Terescenco</h3>
              <h3>South East Technological University</h3>
              <h3>Joined: 26/01/23</h3>
              <h4>Verified</h4>
            </div>
        </div>
        <div className={`${styles.containerItem} ${styles.containerItem2}`}>
          <h2>Game Accounts</h2>
          <div className={styles.gameAccounts}>
                <h2 className={styles.gameAccountItem}>Steam</h2>
                <h2 className={styles.gameAccountItem}>Steam</h2>
                <h2 className={styles.gameAccountItem}>Steam</h2>
                <h2 className={styles.gameAccountItem}>Epic Games</h2>
          </div>
        </div>
        <div className={`${styles.containerItem} ${styles.containerItem3}`}>
            <h2>Teams</h2>
            <div className={styles.cardRow}>
              <TeamList teams={data.foundTeams}/>
            </div>
        </div>
      </div>
      </main>
    </>
  )
}
