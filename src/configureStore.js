// @flow

import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './Reducers';

const loggerMiddleware = createLogger();

export default function configureStore(preloadedState: Object) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      loggerMiddleware,
      thunk,
    ),
  );
}
