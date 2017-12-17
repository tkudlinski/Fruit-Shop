// @flow
import * as React from 'react';

import {
  Button,
  ListGroupItem,
  Media,
} from 'react-bootstrap';

import type { ItemType } from '../../Utils';

import './index.css';

type PropsType = {
    item: ItemType | void,
    currentValue: number,
    onAddProduct: (id: number) => void,
    onRemoveProduct: (id: number) => void,
};

const ReceiptItem = (props: PropsType) => {
  const {
    item,
    currentValue,
    onAddProduct,
    onRemoveProduct,
  } = props;

  if (!item || currentValue === 0) {
    return null;
  }

  const handleAddProduct = () => onAddProduct(item.id);
  const handleRemoveProduct = () => onRemoveProduct(item.id);
  return (
    <ListGroupItem>
      <Media>
        <Media.Left>
          <img alt="receipt" width={64} height={64} src={item.src} />
        </Media.Left>
        <Media.Body>
          <Media.Heading>{ item.label }</Media.Heading>
        </Media.Body>
        <Media.Right>
          <div className="ReceiptItem_controls">
            <Button onClick={handleRemoveProduct} bsStyle="default">-</Button>
            <div>
              { currentValue }
            </div>
            <Button onClick={handleAddProduct} bsStyle="default">+</Button>
          </div>
        </Media.Right>
      </Media>
    </ListGroupItem>
  );
};

export default ReceiptItem;
