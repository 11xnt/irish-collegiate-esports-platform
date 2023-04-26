import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import { signOut, useSession } from 'next-auth/react'

const pages = [
    { name: "Home", href: "/" },
    { name: "Tournaments", href: `/tournaments`, href2: `/tournaments/[id]` },
    { name: "Teams", href: "/teams", href2: "/teams/[id]" },
    { name: "Profile", href: "/profile" },
]

export default function Menu() {
    const router = useRouter()
    const currentRoute = router.pathname

    return (
        <div className={styles.menu}>
            {
                pages.map((page) => (
                    <div key={page.name}
                    className={`${
                        currentRoute === page.href || currentRoute === page.href2
                        ? styles.active
                        : styles.menuItem
                    }`}
                    onClick={() => router.push(page.href)}>
                    {page.name}
                </div>
                ))
            }
            <div className={styles.menuItem2} onClick={() => {signOut()}}>
                Sign Out
            </div>
            <div className={styles.menuItem2} onClick={() => router.push('/organisers')}>
                Become a tournament organiser
            </div>
            <div className={styles.menuItem2}
                onClick={() => window.open(
                    "https://discord.com/oauth2/authorize?client_id=1058056500309921903&permissions=268438528&redirect_uri=https%3A%2F%2Firish-collegiate-esports.azurewebsites.net%2Fapi%2Fauth%2Fcallback%2Fdiscord&response_type=code&scope=bot%20guilds"
                )}>
                Add Discord Bot
            </div>
        </div>
    )
}