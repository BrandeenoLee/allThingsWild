import { addShifts, newVolunteer } from "@/lib/getData";
import React, { useState } from "react";
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { Shift, Volunteer } from "@/lib/types";

// TODO: Add validation rules
// check for valid email
// make email and name required
export default function VolunteerSignUpModal({
  showModal,
  toggleShowModal,
  alertText = "",
}) {
  const submitForm = (e) => {
    e.preventDefault();
    var email = (document.getElementById("email") as HTMLFormElement).value;
    var name = (document.getElementById("name") as HTMLFormElement).value;
    var phone = (document.getElementById("phone") as HTMLFormElement).value;
    var emerContact = (document.getElementById(
      "emerContact"
    ) as HTMLFormElement).value;
    var emerPhone = (document.getElementById("emerPhone") as HTMLFormElement)
      .value;
    var volunteerInfo: Volunteer = {
      email,
      name,
      phone,
      emergencyName: emerContact,
      emergencyPhone: emerPhone,
    };

    newVolunteer(volunteerInfo).then(() => {
      // show success image for a few seconds
      // close modal
    });
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showModal}
      onHide={toggleShowModal}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Volunteer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alertText && <Alert variant="info">{alertText}</Alert>}
        <div className="form-container">
          <Form onSubmit={submitForm}>
            <h3>Your Info</h3>
            <Form.Group as={Row} controlId="name">
              <Form.Label column sm={3} lg={2}>
                Name:
              </Form.Label>
              <Col sm={9} lg={10}>
                <Form.Control type="text" placeholder="Full name" required />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="email">
              <Form.Label column sm={3} lg={2}>
                Email:
              </Form.Label>
              <Col sm={9} lg={10}>
                <Form.Control type="email" placeholder="Email" required />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="phone">
              <Form.Label column sm={3} lg={2}>
                Phone Number:
              </Form.Label>
              <Col sm={9} lg={10}>
                <Form.Control type="text" placeholder="Phone number" />
              </Col>
            </Form.Group>
            <hr></hr>
            <h3>Emergency Contact Info</h3>
            <Form.Group as={Row} controlId="emerContact">
              <Form.Label column sm={3} lg={2}>
                Name:
              </Form.Label>
              <Col sm={9} lg={10}>
                <Form.Control
                  type="text"
                  placeholder="Emergency contact name"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="emerPhone">
              <Form.Label column sm={3} lg={2}>
                Phone Number:
              </Form.Label>
              <Col sm={9} lg={10}>
                <Form.Control placeholder="Emercency contact phone" />
              </Col>
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleShowModal}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </Modal.Footer>
    </Modal>
  );
}
