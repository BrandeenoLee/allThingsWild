import Link from 'next/link'
import Container from '@/components/container'
import styles from '../nav/navbar.module.scss'



export default function Nav({ activePage }) {
  console.log("active Page", activePage);
  return (
    <Container className="py-4">
      <nav className={styles.nav}>
        <ul>
      <li className={`${styles.navLink} ${activePage === 'home' ? styles.activePage : ''}`}>
        <Link
          href= '/'>
          <a>Home</a>
        </Link>
      </li>
      <li className={`${styles.navLink} ${activePage === 'hours' ? styles.activePage : ''}`}>
        <Link
          href= '/hours'>
          <a>Hours</a>
        </Link>
      </li>
      <li className={`${styles.navLink} ${activePage === 'addVolunteer' ? styles.activePage : ''}`}>
        <Link
          href='/addVolunteer'>
            <a>Add Volunteer</a>
          </Link>
      </li>
      </ul>
      </nav>
    </Container>
  )
}

