import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function TournamentCard({id, name, organiser, prize, gameName, maxTeams}: any) {
    const router = useRouter()
    console.log(id)
    return (
        <div onClick={() => router.push(`/tournaments/${id}`)}>
            <div className={styles.card}>
                <div style={{ position: 'relative', width: '100%', height: '70%' }}>
                    <Image src="/images/default_player.png" fill
                    alt=''/>
                </div>
                <div className={styles.description}>
                    <h3><b>{ name }</b></h3>
                    <h4>{ organiser }</h4>
                    <h5>Prize Pool: { prize }</h5>
                    <h5>{ gameName }</h5>
                    <h5>Maximum Teams: { maxTeams }</h5>
                    {/* <h5>{ organiser }</h5> */}
                </div>
            </div>
        </div>
    )
}