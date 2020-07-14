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
          <div className="back-to-shop" onClick={() => this.setView('shop', {})}><i className="fas fa-long-arrow-alt-left">Shop more</i></div>
          <h3 className="cart-title">My Bag</h3>
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
      <div className="back-to-shop" onClick={() => this.setView('shop', {})}><i className="fas fa-long-arrow-alt-left">Shop more</i></div>
      <h3 className="cart-title">My Bag</h3>
      <div>
        {currentSummary}
      </div>
      <h2>Cart total: ${(cartTotal / 100).toFixed(2)}</h2>
      <button className="btn btn-dark" onClick={() => this.setView('checkout', {})}>Checkout</button>
    </div>
    );
  }
}
export default CartSummary;
