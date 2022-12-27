import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';

import SigninForm from './signin/SigninForm';
import SignupForm from './signup/SignupForm';
import AuthImage from '../../components/images/AuthImage';
import mobileImage from '../../assets/images/mobile.svg';
import { StyledUserContainer } from './UserStyle';
import ProviderRegisterForm from './provider-register/ProviderRegisterForm';
import SeekerRegisterForm from './seeker-register/SeekerRegisterForm';
import { ProtectedRoute } from '../../helpers/routes';

const User = () => {
  const { path } = useRouteMatch();
  return (
    <StyledUserContainer>
      <div className='mobile-auth-container'><img className='mobile-auth-image' src={mobileImage} /></div>
      <Row className='user-row'>
        <Col md={6} className="hidden-sm" ><AuthImage /></Col>
        <Col md={6} sm={12} className="form-card" >
          <Switch>
            <Route exact path={'/user/signin'} component={SigninForm} />
            <Route exact path={'/user/signup'} component={SignupForm} />
            <ProtectedRoute exact path={'/user/register/provider'} type="provider" >
              <ProviderRegisterForm />
            </ProtectedRoute>
            <ProtectedRoute exact path={`${path}/register/seeker`} type="seeker" >
              <SeekerRegisterForm />
            </ProtectedRoute>

            <Redirect from="*" to="/error/not-found" />
          </Switch>
        </Col>
      </Row>
    </StyledUserContainer>
  );
};

export default User;
