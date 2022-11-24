import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { user } from '../../features/user/userSelectors';

const Unauthorized = () => {
  const userType = useSelector(user);
  return (
    <Container>
      <h2 className="mt-5">Unauthorized Access</h2>
      <p>You do not have permission to view this page</p>
      <div className="text-center">
        <Link to={`${userType}/dashboard`}><Button className="mr-3">Go to Dashboard</Button></Link>
        <Link to="/user/signin"><Button>Sign In</Button></Link>
      </div>
    </Container>
  );
};

export default Unauthorized;
