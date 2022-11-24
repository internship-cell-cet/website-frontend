import React from 'react';
import { Redirect, Switch, useRouteMatch } from 'react-router-dom';
import { ProtectedRoute } from '../../helpers/routes';
import CreateJob from './create-job/CreateJob';
import ProviderDashboard from './dashboard/ProviderDashboard';

const Provider = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <ProtectedRoute exact path="/provider/dashboard" type="provider">
        <ProviderDashboard />
      </ProtectedRoute>

      <ProtectedRoute exact path={`${path}/create`} type="provider" >
        <CreateJob />
      </ProtectedRoute>

      <Redirect from="*" to="/error/not-found" />
    </Switch>
  );
};

export default Provider;
