import Container from "@/components/container";
import Nav from "@/components/nav";
import getData from "@/lib/getData";
import React, { useState, useEffect } from "react";

export default function IndexPage() {
  const [error, setError] = useState(null);
  const [shifts, setShifts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const today = new Date().toLocaleDateString('en-us');
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    getData('shifts', { filterByFormula: `{date}=${today}` })
      .then(res => {
        console.log('___shifts', res)
        setShifts(res);
      });
      // .then(
      //   (result) => {
      //     setIsLoaded(true);
      //     // setItems(result);
      //   },
      //   // Note: it's important to handle errors here
      //   // instead of a catch() block so that we don't swallow
      //   // exceptions from actual bugs in components.
      //   (error) => {
      //     setIsLoaded(true);
      //     setError(error);
      //   }
      // )
  }, [])


  return (
    <div>
      <Nav activePage='home'/>
      <Container>
        <h1>Today's Volunteers</h1>
        {/* {shifts} */}
        {/* {volunteers.map(v => <div>{v}</div>)} */}
      </Container>
    </div>
    );
}



// import Nav from '@/components/nav'
// import Container from '@/components/container'
// // import Entries from '@/components/entries'

// import { useEntries } from '@/lib/swr-hooks'
// import getData from '@/lib/getData'
// import { useEffect, useState } from 'react';

// // const getVolunteers = async () => {
// //   return getData('volunteers');
// // }

// // const getShifts = async () => {
// //   return getData('shifts');
// // }

// export default async function IndexPage() {
//   // const volunteers = await getData('volunteers');
//   // const shifts = await getData('shifts');//, { filterByFunction: 'email==='});
//   // console.log('___volunteers', volunteers);
//   // console.log('___shifts', shifts);

//   const [volunteers, setVolunteers] = useState([]);
//   const [shifts, setShifts] = useState([]);
//   // const [data, setData] = useState({ hits: [] });
//   // const [query, setQuery] = useState('react');

//   useEffect(() => {
//     let ignore = false;

//     async function fetchData(): void {
//       const result = await getData('volunteers');
//       console.log('___RESULT', result)
//       if (!ignore) setVolunteers(result);
//     }

//     fetchData();
//     return () => { ignore = true; }
//   }, []);

//   // return (
//   //   <>
//   //     <input value={query} onChange={e => setQuery(e.target.value)} />
//   //     <ul>
//   //       {data.hits.map(item => (
//   //         <li key={item.objectID}>
//   //           <a href={item.url}>{item.title}</a>
//   //         </li>
//   //       ))}
//   //     </ul>
//   //   </>
//   // );
//   // }, [])
//   // console.log('process.env', process.env)
//   // console.log('___volunteers.fields', volunteers.fields);
//   return (
//     <div>
//       <Nav activePage='home'/>
//       <Container>
//         <h1>Today's Volunteers</h1>
//         {/* {volunteers.map(v => <div>{v}</div>)} */}
//       </Container>
//     </div>
//   )
// }
