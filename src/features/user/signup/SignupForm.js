import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { push } from "connected-react-router";

import { Form, Button, Row, Col } from "react-bootstrap";

import { StyledSignupForm } from "./SignupFormStyle";
import { signup } from "../userSlice";
import backArrowIcon from "../../../assets/images/backArrowIcon.png";
import UserTypeRadio from "./UserTypeRadio";
// import providerIcon from '../../../assets/images/providerIcon.png';
import seekerIcon from "../../../assets/images/seekerIcon.png";
import { isValidEmail } from "../../../helpers/utils";
import { StyledBackground } from "../UserStyle";
import { UNKNOWN_ERROR_MSG } from "../../../app/constants";

const validateSignup = ({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
}) => {
  const validateError = {};
  if (firstName === "") {
    validateError.firstName = "First name is missing";
  } else if (firstName.length < 2) {
    validateError.firstName = "Should be atleast of length 2";
  }

  if (lastName === "") {
    validateError.lastName = "Last name is missing";
  } else if (lastName.length < 2) {
    validateError.lastName = "Should be atleast of length 2";
  }

  if (email === "") {
    validateError.email = "Email is missing";
  } else {
    const validEmail = isValidEmail(email);
    if (!validEmail) {
      validateError.email = "You have entered an invalid email address!";
    }
  }

  if (password === "") {
    validateError.password = "Password is missing";
  } else if (password !== confirmPassword) {
    validateError.confirmPassword = "Password mismatch";
  }
  return validateError;
};

const SignupForm = () => {
  const [userTypeSelected, setUserTypeSelected] = useState(false);
  const [userType, setUserType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({});

  const dispatch = useDispatch();

  const handleBackButton = () => {
    setUserTypeSelected(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const signupInputs = { firstName, lastName, email, password, userType };
    const validatedErrors = validateSignup({
      ...signupInputs,
      confirmPassword,
    });
    setError(validatedErrors);

    if (Object.keys(validatedErrors).length !== 0) {
      return;
    }

    dispatch(signup(signupInputs)).then(({ meta, payload }) => {
      if (meta.requestStatus === "rejected") {
        setError({
          responseError: (payload && payload.message) || UNKNOWN_ERROR_MSG,
        });
      } else if (userType === "provider") {
        dispatch(push("/user/register/provider"));
      } else if (userType === "seeker") {
        console.log(meta, payload);
        // dispatch(push(`/user/register/seeker/${payload.id}`));
        dispatch(push(`/user/register/seeker`));
      }
    });
  };

  const UserTypeSelect = () => (
    <div>
      <h2 className="user-type-header">Select your account type</h2>
      <div className="radio-flex">
        <UserTypeRadio
          title="Job Seeker"
          imgSrc={seekerIcon}
          onClick={() => setUserType("seeker")}
          className={userType === "seeker" ? "selected" : ""}
        />
        {/* <UserTypeRadio disabled
        title="Job Provider"
        imgSrc={providerIcon} onClick={() => setUserType('provider')}
        className={userType === 'provider' ? 'selected' : ''} /> */}
      </div>
      {userType && (
        <div className="next-button-container">
          <Button
            className="next-button"
            onClick={() => setUserTypeSelected(true)}
          >
            NEXT
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <StyledSignupForm>
      <StyledBackground>
        <Form className="registration-details">
          {!userTypeSelected ? (
            <UserTypeSelect />
          ) : (
            <>
              <div className="back-icon-container">
                <Button onClick={handleBackButton}>
                  <img className="back-arrow-icon" src={backArrowIcon} />
                </Button>
              </div>
              <h1 className="register-head">Sign Up</h1>
              <div className="error">{error.field === null && error.error}</div>
              <div className="register-details">
                <Row>
                  <Col xs={12} sm={6}>
                    <Form.Group>
                      <Form.Control
                        type="name"
                        placeholder="First Name"
                        name="firstName"
                        onChange={(e) => setFirstName(e.target.value)}
                        isInvalid={error.firstName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {error.firstName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Form.Group>
                      <Form.Control
                        type="name"
                        placeholder="Last Name"
                        name="lastName"
                        onChange={(e) => setLastName(e.target.value)}
                        isInvalid={error.lastName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {error.lastName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={error.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {error.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={error.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {error.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    isInvalid={error.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {error.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="error">{error.responseError}</div>
                <Button
                  id="register-button"
                  variant="primary"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Sign Up
                </Button>
              </div>
              <div className="login-link">
                Already have an account? <Link to="/user/signin">Sign In</Link>
              </div>
            </>
          )}
        </Form>
      </StyledBackground>
    </StyledSignupForm>
  );
};

export default SignupForm;
