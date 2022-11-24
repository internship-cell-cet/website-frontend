import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';

import { Form, Button } from 'react-bootstrap';

import cellLogo from '../../../assets/images/cellLogo.jpg';
import { StyledSigninForm } from './SigninFormStyle';
import { signin } from '../userSlice';
import { isValidEmail } from '../../../helpers/utils';
import { StyledBackground } from '../UserStyle';
import { UNKNOWN_ERROR_MSG } from '../../../app/constants';

const validateSignin = ({ email, password }) => {
  const validateError = {};

  if (email === '') {
    validateError.email = 'Email is missing';
  } else {
    const validEmail = isValidEmail(email);
    if (!validEmail) {
      validateError.email = 'You have entered an invalid email address!';
    }
  }

  if (password === '') {
    validateError.password = 'Password is missing';
  }
  return validateError;
};

const SigninForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const validatedErrors = validateSignin({ email, password });
    setError(validatedErrors);

    if (Object.keys(validatedErrors).length !== 0) {
      return;
    }

    dispatch(signin({ email, password })).then(({ meta, payload }) => {
      if (meta.requestStatus === 'rejected') {
        setError({ responseError: (payload && payload.message) || UNKNOWN_ERROR_MSG });
      } else if (payload.userType === 'seeker') {
        dispatch(push('/seeker/dashboard'));
      } else {
        dispatch(push('/provider/dashboard'));
      }
    });
  };

  return (
    <StyledSigninForm>
      <StyledBackground>
        <Form className="registration-details">
          <div className='cell-image-container'>
            <img className='cell-image' src={cellLogo}/>
            <div>INTERNSHIP CELL CET</div>
          </div>
          <h1 className = "register-head">Login</h1>
          <div className="register-details">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                name="email"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={error.email}
              />
              <Form.Control.Feedback type="invalid">
                {error.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={error.password}
              />
              <Form.Control.Feedback type="invalid">
                {error.password}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="error">{error.responseError}</div>
            <Button id="register-button" variant="primary" type="submit" onClick={handleSubmit}>
              SignIn
            </Button>
          </div>

          <div className="signup-link">Don&apos;t have an account? <Link to="/user/signup">Sign Up</Link></div>
        </Form>
      </StyledBackground>
    </StyledSigninForm>
  );
};

export default SigninForm;
