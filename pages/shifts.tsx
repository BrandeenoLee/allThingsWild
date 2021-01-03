import React, { useState } from "react";
import BrandedNav from "@/components/brandedNav";
import Container from "@/components/container";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "react-datepicker/dist/react-datepicker.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";

// TODO: Make look and act like the hours table, except show all shifts and don't show checkin/out
// use getShiftText() in utils.ts
export default function Shifts() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const submitForm = () => {
    var email = (document.getElementById("email") as HTMLFormElement).value;
    var radios = document.getElementsByName("shiftHourRadio");
    console.log("radios", radios);
    let checkedVal = "";

    for (var i = 0, length = radios.length; i < length; i++) {
      var radio = radios[i] as HTMLFormElement;

      if (radio.checked) {
        checkedVal = radio.id;
        break;
      }
    }
    console.log("checkedVal", checkedVal);
  };
  return (
    <>
      <BrandedNav activePage="hours" />
      <Container>
        <Form onSubmit={submitForm}>
          <Form.Group as={Row} controlId="email">
            <Form.Label column sm={2}>
              Email:
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="email" placeholder="Email" />
            </Col>
          </Form.Group>

          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            isClearable
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            isClearable
          />

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit">See Shifts</Button>
            </Col>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}
