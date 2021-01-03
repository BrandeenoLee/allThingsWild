import BrandedNav from "@/components/brandedNav";
import Container from "@/components/container";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import { Volunteer } from "@/lib/types";
import { newVolunteer } from "@/lib/getData";

export default function AddVolunteer() {
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const alertStatus = (success: boolean) => {
    if (success) {
      setShowAlert(true);
    } else {
      setShowError(true);
    }
    setTimeout(() => {
      setShowAlert(false);
      setShowError(false);
    }, 3000);
  };

  const submitForm = (e) => {
    e.preventDefault();
    var email = (document.getElementById("email") as HTMLFormElement).value;
    var firstName = (document.getElementById("firstName") as HTMLFormElement)
      .value;
    var lastName = (document.getElementById("lastName") as HTMLFormElement)
      .value;
    var phone = (document.getElementById("phone") as HTMLFormElement).value;
    var emerContact = (document.getElementById(
      "emerContact"
    ) as HTMLFormElement).value;
    var emerPhone = (document.getElementById("emerPhone") as HTMLFormElement)
      .value;
    var volunteerInfo: Volunteer = {
      email,
      name: `${firstName} ${lastName}`,
      phone,
      emergencyName: emerContact,
      emergencyPhone: emerPhone,
    };

    newVolunteer(volunteerInfo, alertStatus);
  };

  return (
    <>
      <BrandedNav activePage="addVolunteer" />
      <Container>
        <Form onSubmit={submitForm}>
          <Form.Row>
            <Col>
              <Form.Group controlId="firstName">
                <Form.Label>First Name:</Form.Label>
                <Form.Control type="text" placeholder="firstName" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name:</Form.Label>
                <Form.Control type="text" placeholder="lastName" />
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="phone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" placeholder="Enter Phone Number" />
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group controlId="emerContact">
                <Form.Label>Emergency Contact:</Form.Label>
                <Form.Control type="text" placeholder="Contact Name" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="emerPhone">
                <Form.Label>Emergency Contact Phone Number:</Form.Label>
                <Form.Control type="number" placeholder="Phone Number" />
              </Form.Group>
            </Col>
          </Form.Row>
          <Button variant="primary" type="submit">
            Submit
          </Button>{" "}
        </Form>
        <Alert variant={"success"} show={showAlert}>
          Volunteer Added!
        </Alert>
        <Alert variant={"danger"} show={showError}>
          Something went wrong!
        </Alert>
      </Container>
    </>
  );
}
