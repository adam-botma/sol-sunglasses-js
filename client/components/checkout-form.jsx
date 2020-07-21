import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.placeOrder = props.placeOrder;
    this.setView = props.setView;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target.id === 'name') {
      this.setState({ name: event.target.value });
    }
    if (event.target.id === 'creditCard') {
      this.setState({ creditCard: event.target.value });
    }
    if (event.target.id === 'shippingAddress') {
      this.setState({ shippingAddress: event.target.value });
    }

  }

  calculateTotal() {
    let total = 0;
    for (let index = 0; index < this.props.cart.length; index++) {
      total += this.props.cart[index].price;
    }
    return (total / 100).toFixed(2);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.placeOrder(this.state);
  }

  render() {
    const {name, creditCard, shippingAddress} = this.state;
    const isEnabled = name.length > 0 && creditCard.length > 0 && shippingAddress.length >0;

    return (
      <div className="container checkout">
        <h1>Checkout:</h1>
        <h5>Order Total: ${this.calculateTotal()}</h5>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" onChange={this.handleChange}/>
          </div>
          <div>
            <label htmlFor="creditCard">Credit Card</label>
            <input type="text" name="creditCard" id="creditCard" onChange={this.handleChange}/>
          </div>
          <label htmlFor="shippingAddress">Shipping Address:</label>
          <textarea name="shippingAddress" id="shippingAddress" cols="30" rows="10" onChange={this.handleChange}></textarea>
          <div className="d-flex justify-content-between">
            <div onClick={() => this.setView('shop', {})}><i className="fas fa-long-arrow-alt-left">Continue Shopping</i></div>
            <p>*All fields are required in order to checkout</p>
            <button  disabled={!isEnabled} className="btn btn-dark">Place Order</button>
          </div>
        </form>
        <p className="disclaimer">PLEASE NOTE: This site is not a live store and is for demonstration only.  Please do not enter actual personal information as no orders will be fufilled.</p>
      </div>

    );
  }

}
export default CheckoutForm;
