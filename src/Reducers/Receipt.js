// @flow

// reducer
import { calculateTotalPrice } from '../Utils';
import type { actionType } from '../Actions';

export type StateType = {
  products: Map<number, number>,
  totalPrice: number,
  isSubmitting: bool,
}

export const initialState = {
  products: new Map(),
  totalPrice: 0,
  isSubmitting: false,
  submitted: false,
};

const stateReducer = (state: StateType = initialState, action: actionType) => {
  switch (action.type) {
    case 'REQUEST_PRODUCT_ADD': {
      const productNumber = state.products.get(action.productId);
      // $FlowFixMe
      const newProducts = new Map(state.products);
      newProducts.set(action.productId, productNumber
        ? productNumber + 1
        : 1);
      return {
        ...state,
        products: newProducts,
        totalPrice: calculateTotalPrice(newProducts),
      };
    }
    case 'REQUEST_PRODUCT_REMOVE': {
      const productNumber = state.products.get(action.productId);
      // $FlowFixMe
      const newProducts = new Map(state.products);
      newProducts.set(action.productId, productNumber
        ? productNumber - 1
        : 0);
      return {
        ...state,
        products: newProducts,
      };
    }
    case 'REQUEST_BASKET_SUBMIT': {
      return {
        ...state,
        isSubmitting: true,
      };
    }
    case 'RECEIVE_BASKET_SUBMIT': {
      return {
        ...state,
        isSubmitting: false,
        // $FlowFixMe
        products: new Map(),
        totalPrice: 0,
        submitted: true,
      };
    }
    case 'RESET_SUBMITTED': {
      return {
        ...state,
        submitted: false,
      };
    }
    default:
      return state;
  }
};

export default stateReducer;
