import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import NotFound from './components/errors/NotFound';
import Unauthorized from './components/errors/Unauthorized';
import NeutalHome from './features/common/neutralHome/NeutalHome';
import Provider from './features/provider/Provider';
import Seeker from './features/seeker/Seeker';
import User from './features/user/User';

const Routes = () => (
  <Switch>
    <Redirect exact from="/" to="/user/signin" />
    <Route path="/home" component={NeutalHome} />
    <Route path="/user" component={User} />
    <Route path="/provider" component={Provider} />
    <Route path="/seeker" component={Seeker} />
    <Route exact path="/error/unauthorized" component={Unauthorized} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
