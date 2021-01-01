import Nav from '@/components/nav';
import Container from '@/components/container';
import Button from 'react-bootstrap/Button';
import React from 'react';
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import FormImpl from 'react-bootstrap/Form';




export default function AddVolunteer() {
  const submitForm = () => {
      var email = (document.getElementById("email") as HTMLFormElement).value;
      var firstName = (document.getElementById("firstName") as HTMLFormElement).value;
      var lastName = (document.getElementById("lastName") as HTMLFormElement).value;
      var emerContact = (document.getElementById("emerContact") as HTMLFormElement).value;
      var emerPhone = (document.getElementById("emerPhone") as HTMLFormElement).value;
      console.log("first name:", firstName, "last name", lastName);
    }
  
  
  
  return (

    <>
      <Nav activePage="addVolunteer" />
      <Container className="w-full lg:w-2/4">

        <Form onSubmit={submitForm}>
                  <Form.Group controlId="email">
                    <Form.Label>
                      Email:
                      <Form.Control type="email" placeholder="Enter email" />
                    </Form.Label>
                  </Form.Group>
                  <Form.Group controlId="firstName">
                    <Form.Label>
                      First Name:
                      <Form.Control type="text" placeholder="firstName" />
                    </Form.Label>
                  </Form.Group>
                  <Form.Group controlId="lastName">
                    <Form.Label>
                      Last Name:
                       <Form.Control type="text" placeholder="lastName"/>
                    </Form.Label>
                  </Form.Group>
                  <Form.Group controlId="emerContact">
                    <Form.Label>
                      Emergencey Contact:
                        <Form.Control type="text" placeholder="Contact Name"/>
                    </Form.Label>
                  </Form.Group>
                  <Form.Group controlId="emerPhone">
                    <Form.Label>
                      Emergencey Contact Phone Number:
                      <Form.Control type="number" placeholder="Phone Number"/>
                    </Form.Label>
                  </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>{' '}
        </Form>
        
      </Container>
    </>
  )
}
