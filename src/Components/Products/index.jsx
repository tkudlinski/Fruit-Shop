// @flow
import * as React from 'react';
import {
  Button,
  Navbar,
  Thumbnail,
  Pager,
} from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';


import Spinner from '../Spinner';
import type { ItemType } from '../../Utils';

import './index.css';

type PropsType = {
  productsLoading: bool,
  products: Array<ItemType> | null,
  numbeOfProdcutsInReceipt: number,
  onFetchProducts: () => void,
  onAddProduct: (productId: number) => void,
  onResetSubmittedState: () => void,
  history: Object,
};

type StateType = {
  currentProductId: number | null
};

class Products extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    // $FlowFixMe
    this.toReceipt = this.toReceipt.bind(this);
    // $FlowFixMe
    this.nextProduct = this.nextProduct.bind(this);
    // $FlowFixMe
    this.previousProduct = this.previousProduct.bind(this);
    // $FlowFixMe
    this.handleAddProduct = this.handleAddProduct.bind(this);

    this.state = {
      currentProductId: null,
    };
  }

  componentDidMount() {
    const {
      onFetchProducts,
      onResetSubmittedState,
      products,
    } = this.props;
    if (!products) {
      onFetchProducts();
    } else {
      onResetSubmittedState();
      this.setState({
        currentProductId: products[0].id,
      });
    }
  }

  componentWillReceiveProps(nextProps: PropsType) {
    if ((this.props.products === null || this.props.products.length === 0)
    && (nextProps.products !== null && nextProps.products.length !== 0)) {
      this.setState({
        currentProductId: nextProps.products[0].id,
      });
    }
  }

  toReceipt() {
    this.props.history.push('/receipt');
  }

  previousProduct() {
    const { products } = this.props;
    if (products) {
      const currentIndex = products.findIndex((product: ItemType): bool => (
        product.id === this.state.currentProductId
      ));
      this.setState({
        currentProductId: currentIndex > 0 ? currentIndex - 1 : 0,
      });
    }
  }

  nextProduct() {
    const { products } = this.props;
    if (products) {
      const currentIndex = products.findIndex((product: ItemType): bool => (
        product.id === this.state.currentProductId
      ));
      this.setState({
        currentProductId: currentIndex < products.length - 1 ? currentIndex + 1 : currentIndex,
      });
    }
  }

  handleAddProduct() {
    const { onAddProduct } = this.props;
    const { currentProductId } = this.state;
    if (currentProductId !== null) {
      onAddProduct(currentProductId);
    }
  }

  render(): React.Node {
    const {
      productsLoading,
      products,
      numbeOfProdcutsInReceipt,
    } = this.props;

    if (productsLoading || !products) {
      return <Spinner />;
    }

    const { currentProductId } = this.state;
    const currentProductModel = products.find((product: ItemType): bool => (
      product.id === currentProductId
    ));

    if (!currentProductModel) {
      return null;
    }

    const currentIndex = products.findIndex((product: ItemType): bool => (
      product.id === this.state.currentProductId
    ));

    const isNextAvailable = currentIndex < products.length - 1;
    const isPreviousAvailable = currentIndex > 0;
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              Fruit Shop
            </Navbar.Brand>
          </Navbar.Header>
          <div className="Products_header_btn">
            <Link to="/receipt">
              <Button bsStyle="info">
                { numbeOfProdcutsInReceipt + ' items in basket' }
              </Button>
            </Link>
          </div>
        </Navbar>
        <Thumbnail src={currentProductModel.src} alt="242x200">
          <h3>{currentProductModel.label}</h3>
          <p>price: {currentProductModel.price}</p>
          <Button className="Products_btn" onClick={this.handleAddProduct} bsStyle="success">Add</Button>
        </Thumbnail>
        <Pager>
          { isPreviousAvailable
          && <Pager.Item onClick={this.previousProduct}>Previous</Pager.Item> }
          {' '}
          { isNextAvailable
          && <Pager.Item onClick={this.nextProduct}>Next</Pager.Item> }
        </Pager>
      </div>
    );
  }
}

export default withRouter(Products);
