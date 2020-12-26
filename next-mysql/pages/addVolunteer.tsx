import Nav from '@/components/nav'
import Container from '@/components/container'


export default function AddVolunteer() {
  return (
    <>
      <Nav activePage="addVolunteer" />
      <Container className="w-full lg:w-2/4">
          <p>Add Volunteer</p>
      </Container>
    </>
  )
}
