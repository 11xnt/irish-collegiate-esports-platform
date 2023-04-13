import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function TeamCard({team}: any) {
  const router = useRouter()
  console.log(team)
  return (
    <div>
      <div className={styles.pCard}>
          <div style={{ position: 'sticky', width: '75%', height: '50%' }}>
              <Image src="/images/default_player.png" fill
              alt=''/>
          </div>
          <div className={styles.description}>
              <h3><b>{ team.name }</b></h3>
              <h4>Members: { team.players.length }</h4>
              <h5 onClick={() => router.push(`/teams/${team.id}`)}><u>View Team</u></h5>
          </div>
      </div>
    </div>
  )
}