import BrandedNav from "@/components/brandedNav";
import Container from "@/components/container";
import ShiftSignUpForm from "@/components/shiftSignUpForm";
import React from "react";

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
