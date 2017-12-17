// @flow

import { products } from '../Utils';

import type { ItemType } from '../Utils';

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';

export const REQUEST_PRODUCT_ADD = 'REQUEST_PRODUCT_ADD';
export const REQUEST_PRODUCT_REMOVE = 'REQUEST_PRODUCT_REMOVE';

export const REQUEST_BASKET_SUBMIT = 'REQUEST_BASKET_SUBMIT';
export const RECEIVE_BASKET_SUBMIT = 'RECEIVE_BASKET_SUBMIT';

export const RESET_SUBMITTED = 'RESET_SUBMITTED';

export type actionType = {
  type: typeof REQUEST_PRODUCTS,
  productsLoading: bool,
} | {
  type: typeof RECEIVE_PRODUCTS,
  products: Array<ItemType>,
  productsLoading: bool,
} | {
  type: typeof REQUEST_PRODUCT_ADD,
  productId: number,
} | {
  type: typeof REQUEST_PRODUCT_REMOVE,
  productId: number,
} | {
  type: typeof REQUEST_BASKET_SUBMIT,
  receipt: Map<string, number>,
  totalPrice: number,
  isSubmitting: true,
} | {
  type: typeof RECEIVE_BASKET_SUBMIT,
  id: number,
  date: number,
  isSubmitting: false,
};

export const requestProducts = () => ({
  type: REQUEST_PRODUCTS,
  productsLoading: true,
});

export const receiveProducts = () => ({
  type: RECEIVE_PRODUCTS,
  products,
  productsLoading: false,
});

export const addProduct = (productId: number) => ({
  type: REQUEST_PRODUCT_ADD,
  productId,
});

export const removeProduct = (productId: number) => ({
  type: REQUEST_PRODUCT_REMOVE,
  productId,
});

export const submitReceipt = (receipt: number, totalPrice: number) => ({
  type: REQUEST_BASKET_SUBMIT,
  receipt,
  totalPrice,
});

export const receiveReceipt = (id: number, date: number) => ({
  type: RECEIVE_BASKET_SUBMIT,
  id,
  date,
});

export const resetSubmittedState = () => ({
  type: RESET_SUBMITTED,
});

// ASYNC
export const fetchProducts = () => (dispatch: any) => {
  dispatch(requestProducts());
  setTimeout(() => {
    dispatch(receiveProducts());
  }, 1500);
};

export const processSubmitReceipt = (receipt: number, totalPrice: number) => (dispatch: any) => {
  dispatch(submitReceipt(receipt, totalPrice));
  setTimeout(() => {
    dispatch(receiveReceipt(0, Date.now()));
  }, 1000);
};
