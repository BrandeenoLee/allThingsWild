import { addShift } from "@/lib/getData";
import { getShiftID, getShiftText } from "@/lib/utils";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import styles from "../shiftSignUpForm/signupform.module.scss";

export default function ShiftSignUpForm() {
  const [useSpecificDateForm, setUseSpecificDateForm] = useState(true);
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [email, setEmail] = useState("");
  const [selectedShift, setSelectedShift] = useState<1 | 2 | 3 | 4>(1);
  const [days, setDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });
  const submitForm = (e) => {
    e.preventDefault();
    useSpecificDateForm ? signUpSingleShift() : signUpRecurringShift();
  };

  const signUpSingleShift = () => {
    const shiftInfo = {
      email,
      shift: selectedShift,
      date: new Date(date).toLocaleDateString(),
    };
    // TODO: add callback to show alert on success
    addShift(shiftInfo);
  };

  const signUpRecurringShift = () => {
    // todo: build array of shiftInfo objects, and call addShift on each
    // alert success after all complete
  };

  return (
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
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Would you like to sign up for a single shift or multiple shifts
            (recurring by day/time)?
          </Form.Label>
          <Form.Check
            type="radio"
            id="radio-date"
            defaultChecked={true}
            onChange={() => setUseSpecificDateForm(true)}
            name="singleRecurringRadios"
            label="Single"
          />
          <Form.Check
            type="radio"
            id="radio-recurring"
            name="singleRecurringRadios"
            onChange={() => setUseSpecificDateForm(false)}
            label="Recurring"
          />
        </Form.Group>
        {useSpecificDateForm && (
          <>
            <Form.Group as={Row} controlId="date">
              <Form.Label column sm={2}>
                Date:
              </Form.Label>
              <Col sm={10}>
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  isClearable
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="shift">
              <Form.Label column sm={2}>
                Shift:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  as="select"
                  onChange={(e) => setSelectedShift(getShiftID(e.target.value))}
                  className={styles.singleSelect}
                >
                  <option value={1}>{getShiftText(1)}</option>
                  <option value={2}>{getShiftText(2)}</option>
                  <option value={3}>{getShiftText(3)}</option>
                  <option value={4}>{getShiftText(4)}</option>
                </Form.Control>
              </Col>
            </Form.Group>
          </>
        )}
        {!useSpecificDateForm && (
          <>
            <Form.Group as={Row} controlId="day">
              <Form.Label column sm={2}>
                Day(s):
              </Form.Label>
              <Col sm={2}>
                {Object.keys(days).map((day) => {
                  return (
                    <Form.Check
                      type="checkbox"
                      id={day}
                      key={day}
                      checked={days[day]}
                      onChange={(e) => console.log("e.target", e.target)}
                      label={day}
                    />
                  );
                })}
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="shift">
              <Form.Label column sm={2}>
                Shift:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  as="select"
                  onChange={(e) => setSelectedShift(getShiftID(e.target.value))}
                  className={styles.singleSelect}
                >
                  <option value={1}>{getShiftText(1)}</option>
                  <option value={2}>{getShiftText(2)}</option>
                  <option value={3}>{getShiftText(3)}</option>
                  <option value={4}>{getShiftText(4)}</option>
                </Form.Control>
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
          </>
        )}
        <Form.Group as={Row}>
          <Col>
            <Button variant="secondary" className="mr-2" onClick={() => {}}>
              Clear
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={
                !email || !(date || (startDate && endDate)) || !selectedShift
              }
            >
              Submit
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}
