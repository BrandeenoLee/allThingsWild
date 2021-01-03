import React, { useState } from "react";
import Nav from "@/components/nav";
import Container from "@/components/container";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "react-datepicker/dist/react-datepicker.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import getData from "@/lib/getData";
import { tryGetPreviewData } from "next/dist/next-server/server/api-utils";
import { filterToDateRange, filterToDateRangeEmail, filterToToday } from "@/lib/airtableFormulas";
import Table from "react-bootstrap/Table";

export default function Hours() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [filteredShifts, setFilteredShifts] = useState([]);

  const submitForm = (e) => {
    e.preventDefault();
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

    // checkedVal send input to API and return filtered.
    getData("shifts", {
      filterByFormula: filterToDateRangeEmail(startDate, endDate, email),
      fields: ["email", "date", "shift"],
    }).then((shifts) => {
      console.log("shifts", shifts);
      setFilteredShifts(shifts);
    });
  };
  return (
    <>
      <Nav activePage="hours" />
      <Container className="w-full lg:w-2/4">
        <Form onSubmit={submitForm}>
          <Form.Group as={Row} controlId="email">
            <Form.Label column sm={2}>
              Email:
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="email" placeholder="Email" />
            </Col>
          </Form.Group>
          <fieldset>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2}>
                Search for Shifts or Hours
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="shifts"
                  name="shiftHourRadio"
                  id="shifts"
                />
                <Form.Check
                  type="radio"
                  label="hours"
                  name="shiftHourRadio"
                  id="hours"
                />
              </Col>
            </Form.Group>
          </fieldset>

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
              <Button variant="primary" type="submit">Submit</Button>
            </Col>
          </Form.Group>
        </Form>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Email</th>
              <th>Date</th>
              <th>Shift</th>
            </tr>
          </thead>
          <tbody>
            {filteredShifts.map(({ email, date, shift }, i) => (
              <tr key={i}>
                <td>{email}</td>
                <td>{date}</td>
                <td>{shift}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
