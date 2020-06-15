import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.setView = props.setView;
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">

        <a className="navbar-brand d-flex align-items-center" href="#">
          <i className="fas fa-dollar-sign fa-lg"></i>
          <h3 className = "title">Wicked Sales</h3>
        </a>
        <div className="d-flex text-light" onClick={() => this.setView('cart', {})}>
          <p>{this.props.cartItemCount} items</p>
          <i className="fas fa-shopping-cart fa-lg"></i>
        </div>
      </nav>

    );
  }

}

export default Header;
