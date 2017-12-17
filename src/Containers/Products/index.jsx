// @flow
import * as React from 'react';
import { connect } from 'react-redux';

import {
  addProduct,
  fetchProducts,
  resetSubmittedState,
} from '../../Actions';

import Products from '../../Components/Products';
import type { ItemType } from '../../Utils';

type PropsType = {
  productsLoading: bool,
  products: Array<ItemType> | null,
  numbeOfProdcutsInReceipt: number,
  onFetchProducts: () => void,
  onAddProduct: (productId: number) => void,
  onResetSubmittedState: () => void,
  match: Object
};

const ProductsContainer = (props: PropsType) => {
  const {
    productsLoading,
    products,
    numbeOfProdcutsInReceipt,
    match,
    onFetchProducts,
    onAddProduct,
    onResetSubmittedState,
  } = props;
  return (
    <Products
      productsLoading={productsLoading}
      products={products}
      numbeOfProdcutsInReceipt={numbeOfProdcutsInReceipt}
      onFetchProducts={onFetchProducts}
      onAddProduct={onAddProduct}
      onResetSubmittedState={onResetSubmittedState}
      match={match}
    />
  );
};

const caculateNumberOfProdcustInReceipt = (productsInReceipt: Map<number, number>): number => {
  let result = 0;
  for (const [_, value] of productsInReceipt) {
    result = result + value;
  }
  return result;
};

const mapStateToProps = (state: Object) => ({
  productsLoading: state.products.productsLoading,
  products: state.products.products,
  numbeOfProdcutsInReceipt: caculateNumberOfProdcustInReceipt(state.receipt.products),
});

const mapDispatchToProps = dispatch => ({
  onFetchProducts: () => dispatch(fetchProducts()),
  onAddProduct: (productId: number) => dispatch(addProduct(productId)),
  onResetSubmittedState: () => dispatch(resetSubmittedState()),
});

const container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductsContainer);


export default container;
