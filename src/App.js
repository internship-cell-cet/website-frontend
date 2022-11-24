import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import Routes from './routes';

import './App.css';
import AppToast from './components/toasts/AppToast';

function App({ history }) {
  return (
    <div className="app">
      <AppToast />

      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </div>
  );
}

App.propTypes = { history: PropTypes.object };

export default App;
