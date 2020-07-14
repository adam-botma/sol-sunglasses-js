import React from 'react';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.setView = props.setView;
  }

  render() {
    const menuClass = this.props.isOpened ? 'menu-opened' : 'menu-closed ';

    return (
      <div className={menuClass}>
        <p onClick={this.props.menuXClicked}>X</p>
        <h1>Menu</h1>
        <ul>
          <li>Shop</li>
          <li>Shopping Bag</li>
          <li>adambotma.com</li>
        </ul>

      </div>

    );

  }

}

export default Menu;
