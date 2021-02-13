import styles from "../brandedNav/nav.module.scss";
import React from "react";
import { Navbar, Nav } from "react-bootstrap";

export default function BrandedNav({ activePage }) {
  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Navbar.Brand href="/">
        <img
          src={"/ATW_Logo-white.svg"}
          width="200"
          className="d-inline-block"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link
          href="/"
          className={`${activePage === "home" ? styles.activePage : ""}`}
        >
          Today's Volunteers
        </Nav.Link>
        <Nav.Link
          href="/signup"
          className={`${activePage === "signup" ? styles.activePage : ""}`}
        >
          Sign Up
        </Nav.Link>
        <Nav.Link
          href="/shifts"
          className={`${activePage === "shifts" ? styles.activePage : ""}`}
        >
          Upcoming Shifts
        </Nav.Link>
        <Nav.Link
          href="/hours"
          className={`${activePage === "hours" ? styles.activePage : ""}`}
        >
          Hours
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
