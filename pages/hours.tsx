import React, { useState } from 'react';
import Nav from '@/components/nav'
import Container from '@/components/container'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from '@/components/button/buttonClick';


export default function Hours() {
      const [email, setEmail] = useState('')
      const [startDate, setStartDate] = useState(new Date());
      const [endDate, setEndDate] = useState(new Date());
  


    return (
      <>
        <Nav activePage="hours" />
          <Container className="w-full lg:w-2/4">

              <form>
                   <label>
                      Email:
                       <input type="text" name="email" />
                    </label>
              </form>
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
                  <Button >Hours</Button>
                  <Button>Shifts</Button>
          </Container>
      </>
  )
}
