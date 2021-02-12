import { addShifts } from "@/lib/getData";
import { getShiftID, getShiftText } from "@/lib/utils";
import React, { FormEvent, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import styles from "../shiftSignUpForm/signupform.module.scss";
import addDays from "date-fns/addDays";
import toast from "react-hot-toast";
import { Shift } from "@/lib/types";

export default function ShiftSignUpForm() {
  const [useSpecificDateForm, setUseSpecificDateForm] = useState(true);
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [email, setEmail] = useState("");
  const [selectedShift, setSelectedShift] = useState<1 | 2 | 3 | 4>(1);
  const [days, setDays] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });

  const onDayCheck = (day: string) => {
    const updatedDays = { ...days };
    updatedDays[day] = !days[day];
    setDays(updatedDays);
  };

  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    useSpecificDateForm ? signUpSingleShift() : signUpRecurringShifts();
  };

  const signUpSingleShift = () => {
    const shiftInfo = {
      email,
      shift: selectedShift,
      date: new Date(date).toLocaleDateString("en-US"),
    };

    addShiftsWithToast([shiftInfo]);
  };

  const getNumericDay = (day: string) => {
    let numericDay: number | null;
    switch (day) {
      case "Sunday":
        numericDay = 0;
        break;
      case "Monday":
        numericDay = 1;
        break;
      case "Tuesday":
        numericDay = 2;
        break;
      case "Wednesday":
        numericDay = 3;
        break;
      case "Thursday":
        numericDay = 4;
        break;
      case "Friday":
        numericDay = 5;
        break;
      case "Saturday":
        numericDay = 6;
        break;
      default:
        numericDay = null;
    }
    return numericDay;
  };

  const signUpRecurringShifts = () => {
    const shiftsToAdd: Shift[] = [];
    const shiftDays = Object.keys(days)
      .filter((day) => days[day])
      .map((d) => getNumericDay(d));
    shiftDays.forEach((day) => {
      let currentDate = startDate;
      // find first date with the correct day
      while (currentDate.getDay() !== day) {
        currentDate = addDays(currentDate, 1);
      }
      // add all shifts for that day within date range
      while (currentDate <= endDate) {
        shiftsToAdd.push({
          email,
          shift: selectedShift,
          date: currentDate.toLocaleDateString("en-US"),
        });
        currentDate = addDays(currentDate, 7);
      }
    });
    addShiftsWithToast(shiftsToAdd);
  };

  const addShiftsWithToast = (shifts: Shift[]) => {
    const addShiftsPromise = addShifts(shifts);
    toast.promise(
      addShiftsPromise,
      {
        loading: "Saving...",
        success: "Hooray, you're signed up!",
        error: "Oh no, something went wrong..",
      },
      {
        success: {
          duration: 4000,
          icon: "🦝",
        },
        error: {
          icon: "🙈",
        },
      }
    );
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
                      onChange={(e) => onDayCheck(day)}
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
