import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import Image from 'next/image'

const playerId = '/profiles/1'

export default function PlayerCard({player}: any) {
    return (
    <Link href={playerId}>
        <div className={styles.pCard}>
            <div style={{ position: 'sticky', width: '75%', height: '50%' }}>
                <Image src="/images/default_player.png" fill
                alt=''/>
            </div>
            <div className={styles.description}>
                <h3><b>Allen Terescenco</b></h3>
                <h4>11xnt</h4>
                <h5>South East Technology University</h5>
                <h5>CS:GO</h5>
                <h5><u>View Profile</u></h5>
            </div>
        </div>
	</Link>
    )
}