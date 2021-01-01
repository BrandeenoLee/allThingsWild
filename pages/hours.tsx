import React, { useState } from 'react';
import Nav from '@/components/nav'
import Container from '@/components/container'
import DatePicker from "react-datepicker";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import "react-datepicker/dist/react-datepicker.css";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'



export default function Hours() {
      const [startDate, setStartDate] = useState(new Date());
      const [endDate, setEndDate] = useState(new Date());
  
      const submitForm = () => {
        var email = (document.getElementById("email") as HTMLFormElement).value;
        var radios = document.getElementsByName("HoursShifts");
        let checkedVal = ''
      

        // for (var i = 0, length = radios.length; i < length; i++) {
        //   var radio = radios[i] as HTMLFormElement;

        //   if (radio.checked) {
        //     checkedVal = radio.value;
        //     break ;
        //   }
        // }
      }
    return (
      <>
        <Nav activePage="hours" />
          <Container className="w-full lg:w-2/4">
              {/* <form onSubmit={submitForm}>
                <label>
                  Email:
                  <input type="text" id="email" name="email"/>      
                </label>
                        
                <DatePicker 
                  selected={startDate} 
                  onChange={date => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  isClearable
                />
                <DatePicker 
                  selected={endDate} 
                  onChange={date => setEndDate(date)} 
                  selectsEnd 
                  startDate={startDate} 
                  endDate ={endDate} 
                  minDate={startDate} 
                  isClearable
                  />
                <input type="radio" id="shifts" name="HoursShifts" value="shifts" defaultChecked></input>
                <label htmlFor="shifts">Shifts</label>
                <input type="radio" id="hours" name="HoursShifts" value="hours"></input>
                <label htmlFor="hours">Hours</label>
                <Button variant="primary" type="submit">Submit</Button>{' '}
              </form> */}
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
                  name="shiftsRadio"
                  id="shiftsRadio"
                />
                <Form.Check
                  type="radio"
                  label="hours"
                  name="hoursRadio"
                  id="hoursRadio"
                />
              </Col>
            </Form.Group>
          </fieldset>

          <DatePicker 
                  selected={startDate} 
                  onChange={date => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  isClearable
                />
                <DatePicker 
                  selected={endDate} 
                  onChange={date => setEndDate(date)} 
                  selectsEnd 
                  startDate={startDate} 
                  endDate ={endDate} 
                  minDate={startDate} 
                  isClearable
                  />

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit">Submit</Button>
            </Col>
          </Form.Group>
</Form>




              {/* <DatePicker 
                  selected={startDate} 
                  onChange={date => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  isClearable
                />
                <DatePicker 
                  selected={endDate} 
                  onChange={date => setEndDate(date)} 
                  selectsEnd 
                  startDate={startDate} 
                  endDate ={endDate} 
                  minDate={startDate} 
                  isClearable
                  /> */}
          </Container>
      </>
  )
}
