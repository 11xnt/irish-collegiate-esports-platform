import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import Image from 'next/image'

export default function PlayerCard({player}: any) {
    const router = useRouter()
    return (
    <div>
        <div className={styles.pCard}>
            <div style={{ position: 'sticky', width: '75%', height: '50%' }}>
                <Image src="/images/default_player.png" fill
                alt=''/>
            </div>
            <div className={styles.description}>
                <h3><b>{player.user.username}</b></h3>
                <h5>{player.user.playerID.institute.name}</h5>
                <h5 onClick={() => router.push(`/profiles/${player.id}`)}><u>View Profile</u></h5>
            </div>
        </div>
	</div>
    )
}