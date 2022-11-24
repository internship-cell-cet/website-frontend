import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <Container>
    <h2 className="mt-5">Page Not Found</h2>
    <p>The requested page is not found on this site</p>
    <div className="text-center">
      <Link to="/dashboard"><Button>Go to Dashboard</Button></Link>
    </div>
  </Container>
);

export default NotFound;
