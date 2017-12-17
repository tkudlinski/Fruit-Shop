// @flow
import * as React from 'react';
import { connect } from 'react-redux';

import {
  addProduct,
  removeProduct,
  processSubmitReceipt,
} from '../../Actions';

import type { ItemType } from '../../Utils';
import { calculateTotalPrice } from '../../Utils';
import Receipt from '../../Components/Receipt';

type PropsType = {
  totalCost: number,
  productsInReceipt: Map<number, number>,
  products: Array<ItemType>,
  isSubmitting: bool,
  submitted: bool,
  onSubmitReceipt: (receipt: number, totalPrice: number) => void,
  onAddProduct: (id: number) => void,
  onRemoveProduct: (id: number) => void,
};

const ReceiptContainer = (props: PropsType) => {
  const {
    totalCost,
    productsInReceipt,
    products,
    isSubmitting,
    submitted,
    onSubmitReceipt,
    onAddProduct,
    onRemoveProduct,
  } = props;
  return (
    <Receipt
      totalCost={totalCost}
      productsInReceipt={productsInReceipt}
      products={products}
      isSubmitting={isSubmitting}
      submitted={submitted}
      onSubmitReceipt={onSubmitReceipt}
      onAddProduct={onAddProduct}
      onRemoveProduct={onRemoveProduct}
    />
  );
};

const mapStateToProps = (state: Object) => ({
  productsInReceipt: state.receipt.products,
  products: state.products.products,
  totalCost: calculateTotalPrice(state.receipt.products),
  isSubmitting: state.receipt.isSubmitting,
  submitted: state.receipt.submitted,
});

const mapDispatchToProps = dispatch => ({
  onSubmitReceipt: (receipt: number, totalPrice: number) => (
    dispatch(processSubmitReceipt(receipt, totalPrice))
  ),
  onAddProduct: (productId: number) => dispatch(addProduct(productId)),
  onRemoveProduct: (productId: number) => dispatch(removeProduct(productId)),
});

const container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReceiptContainer);


export default container;
