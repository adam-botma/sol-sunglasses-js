import React from 'react';
import CartSummaryItem from './cart-summary-item';

class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.setView = props.setView;
    this.cart = props.cart;
  }

  render() {
    if (!this.cart[0]) {
      return (
        <div>
          <div onClick={() => this.setView('catalog', {})}><i className="fas fa-long-arrow-alt-left">Back to Catalog</i></div>
          <h1 className="cart-title">My Cart</h1>
          <div>
            <h1>Your Cart is currently empty...</h1>
          </div>
        </div>
      );
    }
    let cartTotal = 0;
    const currentSummary = this.cart.map(cartItem => {
      cartTotal += cartItem.price;
      return (<CartSummaryItem key={cartItem.cartItemId}name={cartItem.name} image={cartItem.image} price={cartItem.price} shortDesc={cartItem.shortDescription} />);
    });
    return (<div className="container">
      <div onClick={() => this.setView('catalog', {})}><i className="fas fa-long-arrow-alt-left">Back to Catalog</i></div>
      <h1 className="cart-title">My Cart</h1>
      <div>
        {currentSummary}
      </div>
      <h2>Cart total: ${(cartTotal / 100).toFixed(2)}</h2>
    </div>
    );
  }
}
export default CartSummary;
