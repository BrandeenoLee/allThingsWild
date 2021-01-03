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
        shifts.length && setVolunteerNameMap(shifts.map((s) => s.email));
      })
      .catch(() => setLoading(false));
  }, []);

  const setVolunteerNameMap = (emails: string[]) => {
    console.log("formula", filterByEmails(emails));
    const filterByFormula =
      emails.length > 1 ? filterByEmails(emails) : filterByEmail(emails[0]);
    getData("volunteers", { filterByFormula, fields: ["email", "name"] })
      .then((volunteerInfo) => {
        const map = {};
        volunteerInfo.forEach((volunteer) => {
          map[volunteer.email] = volunteer.name;
        });
        setEmailToNameMap(map);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const getShiftText = (shift: 1 | 2 | 3 | 4): string => {
    let str = "";
    switch (shift) {
      case 1:
        str = "8AM - 11AM";
        break;
      case 2:
        str = "11AM - 2PM";
        break;
      case 3:
        str = "2PM - 5PM";
        break;
      case 4:
        str = "5PM - 8PM";
        break;
      default:
        str = "Unknown";
    }
    return str;
  };

  return (
    <div>
      <BrandedNav activePage="home" />
      <Container>
        <h1>
          Today's Volunteers <span>({today})</span>
        </h1>
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
