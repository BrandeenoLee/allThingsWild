import Link from 'next/link'
import Container from '@/components/container'
import ButtonLink from '@/components/button-link'
import styles from '../nav/navbar.module.scss'


export default function Nav({ title = 'Entries' }) {
  return (
    <Container className="py-4">
      <nav className={styles.nav}>
      <ul>
      <li>
        <Link
          href={{
            pathname: '/about',
            query: { name: 'test' },
          }}
        >
          <a>Hours</a>
        </Link>
      </li>
      <li>
        <Link
          href={{
            pathname: '..../pages/hours.ts'
          }}
        >
          <a></a>
        </Link>
      </li>
    </ul>
          <ButtonLink href="/new">Add Volunteer</ButtonLink>
      </nav>
    </Container>
  )
}
