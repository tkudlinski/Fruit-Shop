// @flow

// reducer
import type { actionType } from '../Actions';
import type { ItemType } from '../Utils';

export type StateType = {
  productsLoading: bool,
  products: Array<ItemType> | null,
}

export const initialState = {
  productsLoading: false,
  products: null,
};

const stateReducer = (state: StateType = initialState, action: actionType) => {
  switch (action.type) {
    case 'REQUEST_PRODUCTS':
      return {
        ...state,
        productsLoading: action.productsLoading,
      };
    case 'RECEIVE_PRODUCTS':
      return {
        ...state,
        products: action.products,
        productsLoading: action.productsLoading,
      };
    default:
      return state;
  }
};

export default stateReducer;
