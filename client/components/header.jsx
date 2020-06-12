import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <i className="fas fa-dollar-sign fa-lg"></i>
          <h3 className = "title">Wicked Sales</h3>
        </a>
      </nav>

    );
  }

}

export default Header;
