import Nav from '@/components/nav'
import Container from '@/components/container'


export default function Shifts() {
  return (
    <>
      <Nav activePage="shifts" />
      <Container className="w-full lg:w-2/4">
          <p>Shifts</p>
      </Container>
    </>
  )
}
