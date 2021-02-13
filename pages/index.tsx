import Container from "@/components/container";
import BrandedNav from "@/components/brandedNav";
import { filterToToday } from "@/lib/airtableFormulas";
import getData, { getVolunteers } from "@/lib/getData";
import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { Col, Form, Row, Table } from "react-bootstrap";
import {
  addShiftsWithToast,
  getShiftText,
  getVolunteerNameMap,
} from "@/lib/utils";
import { debug } from "console";
import { Shift } from "@/lib/types";
import VolunteerSignUpModal from "@/components/volunteerSignUpModal";

export default function IndexPage() {
  const [loading, setLoading] = useState(false);
  const [todaysShifts, setTodaysShifts] = useState<Shift[]>([]);
  const [emailToNameMap, setEmailToNameMap] = useState({});
  const [email, setEmail] = useState("");
  const [showVolunteerSignUp, setShowVolunteerSignUp] = useState(false);

  const today = new Date().toLocaleDateString("en-us");
  // TODO: I think there might be a time zone bug, check dates/times that show up
  useEffect(() => {
    setLoading(true);
    getData("shifts", {
      filterByFormula: filterToToday(),
      fields: ["email", "shift", "checkedin", "checkedout"],
      sort: [{ field: "shift", direction: "asc" }],
    })
      .then((shifts) => {
        setTodaysShifts(shifts);
        return getVolunteerNameMap(shifts.map((s) => s.email));
      })
      .then((nameMap) => {
        setEmailToNameMap(nameMap);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const calculateShiftTime = (): 1 | 2 | 3 | 4 => {
    const now = new Date();
    const nowTime = now.getTime();
    if (nowTime < now.setHours(11)) {
      return 1;
    }
    if (nowTime < now.setHours(14)) {
      return 2;
    }
    if (nowTime < now.setHours(17)) {
      return 3;
    }
    return 4;
  };

  const submitTodaySignupForm = (e) => {
    e.preventDefault();
    const volunteers = getVolunteers()
      .then((volunteers) => {
        return volunteers.map((v) => v.email).indexOf(email) > -1;
      })
      .then((isRegistered) => {
        if (isRegistered) {
          const shiftInfo = {
            email,
            shift: calculateShiftTime(),
            date: new Date().toLocaleDateString("en-US"),
          };
          addShiftsWithToast([shiftInfo]);
          return;
        }
        setShowVolunteerSignUp(true);
      });
  };

  return (
    <div>
      <BrandedNav activePage="home" />
      <Container>
        <h2 className="mb-3">
          Today's Volunteers <span>({today})</span>
        </h2>
        {loading && <p>Loading...</p>}
        {!loading && todaysShifts.length === 0 && (
          <Alert variant={"dark"}>No volunteers scheduled today</Alert>
        )}
        {!loading && todaysShifts.length > 0 && (
          <Table striped bordered>
            <thead>
              <tr>
                <th>Volunteer</th>
                <th>Shift</th>
                <th>Check In/Out</th>
              </tr>
            </thead>
            <tbody>
              {todaysShifts.map(
                ({ email, shift, checkedin, checkedout }, i) => (
                  <tr key={i}>
                    <td>{emailToNameMap && emailToNameMap[email]}</td>
                    <td>{getShiftText(shift)}</td>
                    <td>
                      <Button variant="primary">
                        {checkedin && !checkedout ? "Clock Out" : "Clock In"}
                      </Button>{" "}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        )}
        <hr />
        <h3 className="mb-3">
          Not signed up yet? Enter your email and we'll sign you up and check
          you in.
        </h3>
        <Form onSubmit={submitTodaySignupForm}>
          <Form.Group as={Row} controlId="email">
            <Form.Label column sm={1}>
              Email:
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
            <Col sm={4}>
              <Button type="submit" disabled={!email}>
                Sign Up/Check In
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Container>
      <VolunteerSignUpModal
        showModal={showVolunteerSignUp}
        toggleShowModal={() => setShowVolunteerSignUp(!showVolunteerSignUp)}
        alertText="We don't have you in our system yet, sign up first to sign up for shifts."
      />
    </div>
  );
}
