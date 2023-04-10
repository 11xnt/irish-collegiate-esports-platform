import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Menu from '../components/menu'
import TeamCard from '../components/teamCard'
import PlayerCard from '../components/playerCard'
import TeamList from '../components/teamList'
import useSWR	from 'swr';
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import TeamForm from '../components/forms/team'
const inter = Inter({ subsets: ['latin'] })

const fetcher = (...args: [any, any]) => fetch(...args).then((res) => res.json())


export default function Teams(props) {

  const router = useRouter()
  const { data: session, status } = useSession()
  const [calledPush, setCalledPush] = useState(false)
  const [foundTeams, setFoundTeams] = useState([])
  const [isDisplay, setDisplay] = useState(false)

  useEffect(()=>{
    if(status !== "loading"){
      if (status === "authenticated") {
        if(calledPush) return
        else{
          router.push('/teams')
          setCalledPush(true)
        }
      }else{
        router.push('/')
        return setCalledPush(true)
      }
  }},[router,session])

  const { data, error } = useSWR('/api/home/recommend', fetcher);

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

    return (
      <>
        <Head>
          <title>Teams Page</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
        <Menu/>
          <div className={styles.container}>
          {/* row */}
          <div className={`${styles.containerItem} ${styles.containerItem3}`}>
              <h2>Teams</h2>
              <button onClick={() => setDisplay(!isDisplay)}>Create a team</button>
              {isDisplay ? <TeamForm user={session.user}/> : null}
              <div className={styles.cardRow}>
                {
                  data.foundTeams > 0 ? <TeamList teams={data.foundTeams}/> : <h2>No Teams Found</h2>
                }
              </div>
          </div>
        </div>
        </main>
      </>
    )
}

