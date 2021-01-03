import React, { useState } from "react";
import BrandedNav from "@/components/brandedNav";
import Container from "@/components/container";
import ShiftSignUpForm from "@/components/shiftSignUpForm";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "react-datepicker/dist/react-datepicker.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";
import { filterToDateRangeEmail } from "@/lib/airtableFormulas";
import getData from "@/lib/getData";
import Table from "react-bootstrap/Table";
import { getShiftText } from "@/lib/utils";
import Alert from "react-bootstrap/Alert";

// TODO: Make look and act like the hours table, except show all shifts and don't show checkin/out
// use getShiftText() in utils.ts
export default function Shifts() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [filteredShifts, setFilteredShifts] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    var email = (document.getElementById("email") as HTMLFormElement).value;
    getData("shifts", {
      filterByFormula: filterToDateRangeEmail(startDate, endDate, email),
      fields: ["email", "date", "shift"],
    }).then((shifts) => {
      setFilteredShifts(shifts);
      setHasSearched(true);
      setIsLoading(false);
      console.log("filteredShifts", filteredShifts);
    });
  };

  const clearResults = () => {
    // TODO: Also clear form fields
    setFilteredShifts([]);
    setHasSearched(false);
  };

  return (
    <>
      <BrandedNav activePage="shifts" />
      <Container>
        <ShiftSignUpForm />
        <Form onSubmit={submitForm}>
          <Form.Group as={Row} controlId="email">
            <Form.Label column sm={2}>
              Email:
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="email" placeholder="Email" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="startDate">
            <Form.Label column sm={2}>
              From Date:
            </Form.Label>
            <Col sm={10}>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                isClearable
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="endDate">
            <Form.Label column sm={2}>
              To Date:
            </Form.Label>
            <Col sm={10}>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                isClearable
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button
                variant="secondary"
                className="mr-2"
                onClick={clearResults}
              >
                Clear
              </Button>
              <Button type="submit">See Shifts</Button>
            </Col>
          </Form.Group>
        </Form>
        {isLoading && <p>Loading hours...</p>}
        {!isLoading && hasSearched && filteredShifts.length === 0 && (
          <Alert variant={"info"}>
            We Didn't find any shifts for this email.
          </Alert>
        )}
        {!isLoading && filteredShifts.length > 0 && (
          <Table striped bordered>
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
                  <td>{getShiftText(shift)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
}
