import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.setView = props.setView;
  }

  render() {
    const navColor = this.props.view === '';
    return (

      <nav className={navColor ? 'navbar text-white' : ' navbar navbar2 text-dark'}>

        <i className="fas fa-bars fa-lg"></i>

        <div className="d-flex" onClick={() => this.setView('cart', {})}>

          <i className="fas fa-shopping-cart fa-lg">{this.props.cartItemCount}</i>
        </div>
      </nav>

    );
  }

}

export default Header;
