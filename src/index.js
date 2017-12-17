// @flow

import * as React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import configureStore from './configureStore';
import App from './App';
import Products from './Containers/Products';
import Receipt from './Containers/Receipt';
import { initialState as InitialProductsState } from './Reducers/Products';
import { initialState as InitialReceiptState } from './Reducers/Receipt';

const store = configureStore({
  products: InitialProductsState,
  receipt: InitialReceiptState,
});
/* eslint-disable */
render(
  <Provider store={store}>
    <Router>
      <App>
        <Route exact path="/" component={Products} />
        <Route path="/receipt" component={Receipt} />
      </App>
    </Router>
  </Provider>,
  // $FlowFixMe
  document.getElementById('root'),
);
