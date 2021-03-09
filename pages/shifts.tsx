import React, { useState } from "react";
import BrandedNav from "@/components/brandedNav";
import Container from "@/components/container";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { filterToDateRangeEmail } from "@/lib/airtableFormulas";
import getData from "@/lib/getData";
import Table from "react-bootstrap/Table";
import { getShiftText, todayPlusDays } from "@/lib/utils";
import Alert from "react-bootstrap/Alert";
import { Shift } from "@/lib/types";
import { start } from "repl";
import { getDisplayName } from "next/dist/next-server/lib/utils";
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function Shifts() {
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(todayPlusDays(30));
  const [filteredShifts, setFilteredShifts] = useState<Shift[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    getData("shifts", {
      filterByFormula: filterToDateRangeEmail(startDate, endDate, email),
      fields: ["date", "shift"],
    }).then((shifts: Shift[]) => {
      console.log("shifts", shifts)
      setFilteredShifts(shifts);
      setHasSearched(true);
      setIsLoading(false);
    });
  };

  const changeDateFormat = (inputDate) => {  // expects Y-m-d
    var splitDate = inputDate.split('-');
    if(splitDate.count == 0){
        return null;
    }

    var year = splitDate[0];
    var month = splitDate[1];
    var day = splitDate[2]; 

    return month + '/' + day + '/' + year;
}

  const clearResults = () => {
    setFilteredShifts([]);
    setStartDate(null);
    setEndDate(null);
    setEmail("");
    setHasSearched(false);
  };

  return (
    <>
      <BrandedNav activePage="shifts" />
      <Container>
        <h2>Shifts</h2>
        <p>Fill out the form to see shifts within the specified date range.</p>
        <div className="form-container">
          <Form onSubmit={submitForm}>
            <Form.Group as={Row} controlId="email">
              <Form.Label column sm={2}>
                Email:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  required
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
                  required
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
                  required
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
                <Button
                  type="submit"
                  disabled={!!(!email || !startDate || !endDate)}
                >
                  See Shifts
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
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
                <th>Edit</th>
                <th>Date</th>
                <th>Shift</th>
              </tr>
            </thead>
            <tbody>
              {filteredShifts.map(({ id, date, shift }, i) => (
                <tr key={i}>
                  <td><i className="far fa-edit"></i></td>
                  <td>{changeDateFormat(date)}</td>
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
