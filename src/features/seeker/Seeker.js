import React from 'react';
import { Redirect, Switch, useRouteMatch } from 'react-router-dom';
import { ProtectedRoute } from '../../helpers/routes';
import SeekerDashboard from './dashboard/SeekerDashboard';
import { SearchResults } from './searchResults/SearchResults';

const Seeker = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <ProtectedRoute exact path={`${path}/dashboard`}>
        <SeekerDashboard />
      </ProtectedRoute>
      <ProtectedRoute exact path={`${path}/search`}>
        <SearchResults/>
      </ProtectedRoute>

      <Redirect from="*" to="/error/not-found" />
    </Switch>
  );
};

export default Seeker;
