import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import userReducer from '../features/user/userSlice';
import skillReducer from '../features/common/skills/skillSlice';
import seekerReducer from '../features/seeker/seekerSlice';
import appReducer from '../appSlice';

export const history = createBrowserHistory();

const reducer = {
  router: connectRouter(history),
  app: appReducer,
  users: userReducer,
  providers: seekerReducer,
  skills: skillReducer,
};

const middleware = (getDefaultMiddleware) => getDefaultMiddleware()
  .concat(routerMiddleware(history));

export const store = configureStore({ reducer, middleware });
