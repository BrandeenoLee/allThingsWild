import React, { useEffect, useState } from "react";
import BrandedNav from "@/components/brandedNav";
import Container from "@/components/container";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import getData from "@/lib/getData";
import { filterToDateRangeEmail } from "@/lib/airtableFormulas";
import Table from "react-bootstrap/Table";
import { Alert } from "react-bootstrap";
import { todayPlusDays } from "@/lib/utils";

export default function Hours() {
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(todayPlusDays(-30));
  const [endDate, setEndDate] = useState(new Date());
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredShifts, setFilteredShifts] = useState([]);

  const submitForm = (e) => {
    e.preventDefault();
    setIsLoading(true);
    getData("shifts", {
      filterByFormula: filterToDateRangeEmail(startDate, endDate, email),
      fields: ["email", "date", "checkedin", "checkedout"],
      sort: [{ field: "date", direction: "asc" }],
    }).then((shifts) => {
      setFilteredShifts(shifts.filter((s) => s.checkedin && s.checkedout));
      setHasSearched(true);
      setIsLoading(false);
    });
  };

  const clearResults = () => {
    setFilteredShifts([]);
    setHasSearched(false);
    setEmail("");
  };

  return (
    <>
      <BrandedNav activePage="hours" />
      <Container>
        <h2>Hours</h2>
        <p>
          Fill out the form to see the hours that you have volunteered in the
          specified date range.
        </p>
        <div className="form-container">
          <Form onSubmit={submitForm}>
            <Form.Group as={Row} controlId="email">
              <Form.Label column sm={2}>
                Email:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
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
              <Col>
                <Button
                  variant="secondary"
                  className="mr-2"
                  onClick={clearResults}
                >
                  Clear
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!!(!email || !startDate || !endDate)}
                >
                  See Hours
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
        {isLoading && <p>Loading hours...</p>}
        {!isLoading && hasSearched && filteredShifts.length === 0 && (
          <Alert variant={"info"}>
            You did not check in for any shifts within this date range.
          </Alert>
        )}
        {!isLoading && filteredShifts.length > 0 && (
          <Table striped bordered>
            <thead>
              <tr>
                <th>Email</th>
                <th>Date</th>
                <th>Clocked In</th>
                <th>Clocked Out</th>
                <th>Total Hrs</th>
              </tr>
            </thead>
            <tbody>
              {filteredShifts.map(
                ({ email, date, checkedin, checkedout, hrsCompleted }, i) => (
                  <tr key={i}>
                    <td>{email}</td>
                    <td>{date}</td>
                    {/* TODO: Format Times & calc hours */}
                    <td>{checkedin}</td>
                    <td>{checkedout}</td>
                    <td>TODO - calculate</td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
}
