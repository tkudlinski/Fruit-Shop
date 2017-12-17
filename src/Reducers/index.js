// @flow

import { combineReducers } from 'redux';

import Products from './Products';
import Receipt from './Receipt';

export default combineReducers({
  products: Products,
  receipt: Receipt,
});

