import BrandedNav from "@/components/brandedNav";
import Container from "@/components/container";
import ShiftSignUpForm from "@/components/shiftSignUpForm";
import VolunteerSignUpModal from "@/components/volunteerSignUpModal";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

// TODO: Maybe we can just add a button here that opens a modal to add volunteer and get rid of that page
export default function SignUpPage() {
  const [showVolunteerSignUp, setShowVolunteerSignUp] = useState(false);
  return (
    <>
      <BrandedNav activePage="signup" />
      <Container>
        <h2>Sign Up for Shifts</h2>
        <ShiftSignUpForm />

        <h2>New Volunteer?</h2>
        <Button onClick={() => setShowVolunteerSignUp(true)}>
          Click to Sign Up
        </Button>
        <VolunteerSignUpModal
          showModal={showVolunteerSignUp}
          toggleShowModal={() => setShowVolunteerSignUp(!showVolunteerSignUp)}
        />
      </Container>
    </>
  );
}
