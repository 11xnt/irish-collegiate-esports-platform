import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from '@next/font/google'
import styles from '../../styles/Home.module.css'
import Menu from '../../components/menu'
import TournamentCard from '../../components/tournamentCard'
import PlayerCard from '../../components/playerCard'
import useSWR  from 'swr';
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

const fetcher = (...args: [any, any]) => fetch(...args).then((res) => res.json())

export default function Team(props) {

  const router = useRouter()
  const id = router.query.id as string

  const { data: session, status } = useSession()

  useEffect(()=>{
    if(status !== "loading"){
      if (status === "authenticated") {
        router.push(`/teams/${id}`)
      }else{
        router.push('/')
      }
  }},[router,session])

  const { data, error } = useSWR(`/api/teams/${id}`, fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <Head>
        <title>Team Page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      <Menu/>
        <div className={styles.container}>
        {/* row */}
        <div className={`${styles.containerItem} ${styles.containerItem3}`}>
            <div className={styles.profileImage}>
                <Image src="/images/default_player.png" fill
                    alt=''/>
            </div>
            <div className={styles.profileSummary}>
              <h2>{data.name}</h2>
              <h3>6 Members</h3>
              <h3>Created: 26/01/23</h3>
            </div>
        </div>
        <div className={`${styles.containerItem} ${styles.containerItem3}`}>
            <h2>Players</h2>
            <div className={styles.cardRow}>
              
              {/* <PlayerCard/>
              <PlayerCard/>
              <PlayerCard/>
              <PlayerCard/>
              <PlayerCard/>
              <PlayerCard/>
              <PlayerCard/>
              <PlayerCard/>
              <PlayerCard/>
              <PlayerCard/>
              <PlayerCard/>
              <PlayerCard/> */}
            </div>
        </div>
      </div>
      </main>
    </>
  )
}
