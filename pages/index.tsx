import Container from "@/components/container";
import BrandedNav from "@/components/brandedNav";
import {
  filterByEmail,
  filterByEmails,
  filterToToday,
} from "@/lib/airtableFormulas";
import getData from "@/lib/getData";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { Table } from "react-bootstrap";
import { getShiftText, getVolunteerNameMap } from "@/lib/utils";

export default function IndexPage() {
  const [loading, setLoading] = useState(false);
  const [todaysShifts, setTodaysShifts] = useState([]);
  const [emailToNameMap, setEmailToNameMap] = useState({});

  const today = new Date().toLocaleDateString();

  useEffect(() => {
    setLoading(true);
    getData("shifts", {
      filterByFormula: filterToToday(),
      fields: ["email", "shift", "checkedin", "checkedout"],
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

  return (
    <div>
      <BrandedNav activePage="home" />
      <Container>
        <h2>
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
              {todaysShifts.map(({ email, shift, checkedin, checkedout }) => (
                <tr key={email}>
                  <td>{emailToNameMap && emailToNameMap[email]}</td>
                  <td>{getShiftText(shift)}</td>
                  <td>
                    <Button variant="primary">
                      {checkedin && !checkedout ? "Clock Out" : "Clock In"}
                    </Button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
}
