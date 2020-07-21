
import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import MainCarousel from './main-carousel';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startMessage: true,
      message: null,
      isLoading: true,
      view: {
        name: '',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.closeStartMessage = this.closeStartMessage.bind(this);

  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
    this.getCartItems();
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => this.setState({ cart: data }));
  }

  setView(incomingName, incommingParams) {
    this.setState({ view: { name: incomingName, params: incommingParams } });
  }

  closeStartMessage() {
    this.setState({ startMessage: false });
  }

  addToCart(product) {

    const currentCart = this.state.cart.slice();
    fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    currentCart.push(product);
    this.setState({ cart: currentCart });
  }

  placeOrder(orderInfo) {
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderInfo)
    });
    this.setState({ cart: [], view: { name: 'catalog', params: {} } });
  }

  whichView() {
    if (this.state.view.name === 'cart') {
      document.body.style.overflow = 'hidden scroll';
      return <CartSummary cart={this.state.cart} setView={this.setView}/>;
    }
    if (this.state.view.name === 'details') {
      document.body.style.overflow = 'hidden';
      return <ProductDetails addToCart={this.addToCart} productId={this.state.view.params.productId} setView={this.setView} />;
    }
    if (this.state.view.name === 'checkout') {
      document.body.style.overflow = 'hidden scroll';
      return <CheckoutForm placeOrder={this.placeOrder}cart={this.state.cart} setView={this.setView}/>;
    }
    if (this.state.view.name === 'shop') {
      document.body.style.overflow = 'hidden scroll';
      return <ProductList setView={this.setView} />;
    }
    document.body.style.overflow = 'hidden';
    return <MainCarousel closeStartMessage={this.closeStartMessage} startMessage={this.state.startMessage} setView={this.setView}/>;
  }

  render() {
    return (
      <>
        <Header cartItemCount={this.state.cart.length} setView={this.setView} view={this.state.view.name}/>
        {this.whichView()}
      </>
    );
  }
}
