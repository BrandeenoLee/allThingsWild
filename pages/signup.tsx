import BrandedNav from "@/components/brandedNav";
import Container from "@/components/container";
import ShiftSignUpForm from "@/components/shiftSignUpForm";
import React from "react";

// TODO: Maybe we can just add a button here that opens a modal to add volunteer and get rid of that page
export default function SignUpPage() {
  return (
    <>
      <BrandedNav activePage="signup" />
      <Container>
        <h2>Sign Up for Shifts</h2>
        <ShiftSignUpForm />
      </Container>
    </>
  );
}
