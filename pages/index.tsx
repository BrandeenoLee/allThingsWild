import Container from "@/components/container";
import Nav from "@/components/nav";
import { filterToToday } from "@/lib/airtableFormulas";
import getData from "@/lib/getData";
import React, { useState, useEffect } from "react";

export default function IndexPage() {
  const [todaysShifts, setTodaysShifts] = useState([]);
  const today = new Date().toLocaleDateString();

  useEffect(() => {
    getData('shifts', { filterByFormula: filterToToday(), fields: ['email', 'shift', 'checkedin', 'checkedout'] })
      .then(shifts => {
        console.log('___shifts', shifts)
        setTodaysShifts(shifts);
      });
  }, [])

  const getShiftText = (shift: 1 | 2 | 3 | 4): string => {
    let str = '';
    switch(shift) {
      case 1:
        str = '8AM - 11AM'
        break;
      case 2:
        str = '11AM - 2PM'
        break;
      case 3:
        str = '2PM - 5PM'
        break;
      case 4:
        str = '5PM - 8PM'
        break;
      default:
        str = 'Unknown'
    }
    return str;
  }

  /**
   * TODO:
   * - Get volunteer name instead of email
   */

  return (
    <div>
      <Nav activePage='home'/>
      <Container>
        <h1>Today's Volunteers <span>({today})</span></h1>
        <table>
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
                <td>{email}</td>
                <td>{getShiftText(shift)}</td>
                <td>
                  <button>{checkedin && !checkedout ? 'Clock Out' : 'Clock In'}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </div>
    );
}

