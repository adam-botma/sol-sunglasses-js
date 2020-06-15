
import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);

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
    fetch('http://localhost:3000/api/cart')
      .then(res => res.json())
      .then(data => this.setState({ cart: data }));
  }

  setView(incomingName, incommingParams) {
    this.setState({ view: { name: incomingName, params: incommingParams } });
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

  render() {
    const currentView = this.state.view.name === 'catalog';
    return (
      <div>
        <Header cartItemCount={this.state.cart.length}/>
        {currentView ? <ProductList setView={this.setView} /> : <ProductDetails addToCart= {this.addToCart} productId={this.state.view.params.productId} setView={this.setView}/>}

      </div>
    );
  }
}
