import * as React from 'react';
import './Header.css';

const logo = require('./../../Images/set_logo.png');

class Header extends React.Component<{}, {}> {
  render() {
    return (
      <div>
      <nav className="pt-navbar">
      <div className="pt-navbar-group pt-align-left">
      <img src={logo} className="App-logo" alt="logo" />
      </div>
      </nav>
      </div>
    );
  }
}

export default Header;