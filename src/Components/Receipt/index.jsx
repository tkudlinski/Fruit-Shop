// @flow
import * as React from 'react';
import {
  Button,
  ListGroup,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Spinner from '../Spinner';
import ReceiptItem from './ReceiptItem';

import type { ItemType } from '../../Utils';

import './index.css';

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

const Receipt = (props: PropsType): React.Node => {
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

  const isEmpty = productsInReceipt.size === 0;
  const productsInReceiptArray = Array.from(productsInReceipt);

  if (submitted) {
    return (
      <div className="Receipt--submitted">
        Your request was submitted!
        <Link to="/">
          <Button bsStyle="default">Back to shop</Button>
        </Link>
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div className="Receipt--processing">
        Your request is being processed.
        <Spinner className="Receipt_spinner" />
      </div>
    );
  }

  if (totalCost === 0) {
    return (
      <div className="Receipt_empty_wrapper">
        <Link to="/">
          <Button bsStyle="default">Back</Button>
        </Link>
        <div className="Receipt_empty">
              Your basket is empty.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="Receipt_back_btn">
        <Link to="/">
          <Button bsStyle="default">Back</Button>
        </Link>
      </div>
      { isEmpty
        ? (
          <div>
              Your basket is empty.
          </div>)
        : (
          <div>
            <ListGroup>
              <div>
                {
              productsInReceiptArray.map(([productId, quantity]: [number, number]): React.Node => (
                <ReceiptItem
                  key={productId}
                  item={products.find((product: ItemType): bool => productId === product.id)}
                  currentValue={quantity}
                  onAddProduct={onAddProduct}
                  onRemoveProduct={onRemoveProduct}
                />
              ))
            }
              </div>
            </ListGroup>
            <div className="Receipt_total">
              <div>
                { `Total cost: ${totalCost}` }
              </div>
              <Button onClick={onSubmitReceipt} bsStyle="default">Submit</Button>
            </div>
          </div>
      )}
    </div>
  );
};

export default Receipt;
