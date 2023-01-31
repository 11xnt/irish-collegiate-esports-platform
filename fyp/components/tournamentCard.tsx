import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import Image from 'next/image'

const tournamentId = '/tournaments/1'

export default function TournamentCard() {
    return (
        <Link href={tournamentId}>
            <div className={styles.card}>
                <div style={{ position: 'relative', width: '100%', height: '70%' }}>
                    <Image src="/images/default_player.png" fill
                    alt=''/>
                </div>
                <div className={styles.description}>
                    <h3><b>Tournament Name</b></h3>
                    <h4>Tournament Organizer</h4>
                    <h5>Tournament Prize Pool: $500</h5>
                    <h5>CS:GO</h5>
                    <h5>16 Teams</h5>
                </div>
            </div>
        </Link>
    )
}