import Nav from '@/components/nav';
import Container from '@/components/container';
import Button from '@/components/button/buttonClick';
import style from '@/styles/index';


export default function AddVolunteer() {
  return (
    <>
      <Nav activePage="addVolunteer" />
      <Container className="w-full lg:w-2/4">
        <form>
                   <label>
                      Email:
                       <input type="text" name="email"/>
                    </label>
                    <label>
                      First Name:
                      <input type="text" name="firstName"/>
                    </label>
                    <label>
                      Last Name:
                      <input type="text" name="lastName"/>
                    </label>
        </form>
          <Button>Add Volunteer</Button>
      </Container>
    </>
  )
}
