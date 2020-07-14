import React from 'react';
import Menu from './menu';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { menuOpened: false };
    this.setView = props.setView;
    this.menuClicked = this.menuClicked.bind(this);
    this.menuXClicked = this.menuXClicked.bind(this);
  }

  menuClicked() {
    this.setState({ menuOpened: true });
  }

  menuXClicked() {
    this.setState({ menuOpened: false });
  }

  render() {
    const navColor = this.props.view === '';

    return (
      <>
        <Menu menuClicked={this.menuClicked} menuXClicked={this.menuXClicked}
          setView={this.setView} isOpened={this.state.menuOpened}/>
        <nav className={navColor ? 'navbar text-white' : ' navbar navbar2 text-dark'}>

          <i className="fas fa-bars fa-lg" onClick={this.menuClicked}></i>
          <div className={navColor ? 'shopping-bag' : 'shopping-bag-dark'}onClick={() => this.setView('cart', {})}>
            <i className={navColor ? 'text-white' : 'text-dark'}>{this.props.cartItemCount}</i>
          </div>
        </nav>
      </>
    );
  }

}

export default Header;
