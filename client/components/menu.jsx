import React from 'react';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.setView = props.setView;
    this.menuItemClicked = this.menuItemClicked.bind(this);
  }

  menuItemClicked(item) {
    this.setView(item, {});
    this.props.menuXClicked();

  }

  render() {
    const menuClass = this.props.isOpened ? 'menu-opened' : 'menu-closed d-flex flex-column ';

    return (
      <div className={menuClass}>
        <div className="menu-top d-flex align-items-center justify-content-between">
          <h1 onClick={() => this.menuItemClicked('')}>SOL</h1>
          <p onClick={this.props.menuXClicked}>X</p>
        </div>
        <ul>
          <li onClick={() => this.menuItemClicked('shop')}>Shop</li>
          <li onClick={() => this.menuItemClicked('cart')}>Shopping Bag</li>
        </ul>
        <div className="menu-link d-flex align-items-center justify-content-center">
          <a className="website" href='http://adambotma.com'>adambotma.com</a>
        </div>
      </div>

    );

  }

}

export default Menu;
