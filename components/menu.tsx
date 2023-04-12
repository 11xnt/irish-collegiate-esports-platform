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
    // console.log(currentRoute)

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
        </div>
    )
}