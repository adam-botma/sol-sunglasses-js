import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.setView = props.setView;
  }

  render() {
    return (
      <nav className="navbar text-white">

        <a className="navbar-brand d-flex align-items-center text-white " href="#">
          <i className="fas fa-bars fa-lg"></i>
          {/* <h3 className = "title">Wicked Sales</h3> */}
        </a>
        <div className="d-flex text-light" onClick={() => this.setView('cart', {})}>
          {/* <p>{this.props.cartItemCount} items</p> */}
          <i className="fas fa-shopping-cart fa-lg">{this.props.cartItemCount}</i>
        </div>
      </nav>

    );
  }

}

export default Header;
