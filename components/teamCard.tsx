import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Image from 'next/image'

export default function TeamCard({team}: any) {
    return (
      <Link href={`/teams/${team.id}`}>
        <div className={styles.pCard}>
            <div style={{ position: 'sticky', width: '75%', height: '50%' }}>
                <Image src="/images/default_player.png" fill
                alt=''/>
            </div>
            <div className={styles.description}>
                <h3><b>{ team.name }</b></h3>
                {/* <h4>Created: { team.createdAt}</h4> */}
                <h5><u>View Team</u></h5>
            </div>
        </div>
      </Link>
    )
}