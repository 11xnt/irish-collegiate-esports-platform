import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'

const pages = [
    { name: "Home", href: "/" },
    { name: "Tournaments", href: "/tournaments" },
    { name: "Teams", href: "/teams" },
    { name: "Profile", href: "/profile" },
]

export default function Menu() {
    const router = useRouter()
    const currentRoute = router.pathname

    return (
        <div className={styles.menu}>
            {
                pages.map((page) => (
                    <Link key={page.name}
                    className={`${
                        currentRoute === page.href
                        ? styles.active
                        : styles.menuItem
                    }`} href={page.href}>
                    {page.name}
                </Link>
                ))
            }
        </div>
    )
}