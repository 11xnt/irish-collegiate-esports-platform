import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Image from 'next/image'

export default function TournamentCard(tour: any) {
    const tournament = tour.tournament
    return (
        <Link href={`/tournaments/${tournament.id}`}>
            <div className={styles.card}>
                <div style={{ position: 'relative', width: '100%', height: '70%' }}>
                    <Image src="/images/default_player.png" fill
                    alt=''/>
                </div>
                <div className={styles.description}>
                    <h3><b>{ tournament.name }</b></h3>
                    <h4>{ tournament.organiser }</h4>
                    <h5>Tournament Prize Pool: {tournament.prizePool}</h5>
                    <h5>CS:GO</h5>
                    <h5>Maximum Teams: { tournament.maxTeams }</h5>
                </div>
            </div>
        </Link>
    )
}