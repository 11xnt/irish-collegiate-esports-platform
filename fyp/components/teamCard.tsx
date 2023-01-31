import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import Image from 'next/image'

const teamId = '/teams/1'

export default function TeamCard() {
    return (
      <Link href={teamId}>
        <div className={styles.pCard}>
            <div style={{ position: 'sticky', width: '75%', height: '50%' }}>
                <Image src="/images/default_player.png" fill
                alt=''/>
            </div>
            <div className={styles.description}>
                <h3><b>Team1</b></h3>
                <h4>Created: 31/01/23</h4>
                <h5><u>View Team</u></h5>
            </div>
        </div>
      </Link>
    )
}