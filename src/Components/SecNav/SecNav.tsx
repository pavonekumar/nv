import * as React from 'react';
import './SecNav.css';

class SecNav extends React.Component<{}, {}> {
  render() {
    return (
      <div className="SecNav">
      <div className="pt-button-group pt-fill SecMenu">
          <button className="pt-button pt-align-left no-radius pt-active">Dashboard
          <span className="pt-icon-standard pt-icon-caret-down" />
          </button>
          <button className="pt-button pt-align-left">Inventory</button>
          <button className="pt-button pt-align-left">Trade History</button>
          <button className="pt-button pt-align-left">Vehicle Estimator</button>
          <button className="pt-button pt-fixed pt-align-right" />
          <button className="pt-button pt-fixed pt-align-right no-radius">Locator History</button>
      </div>
      <div className="SecNavMob">
          <h4>
          <span className="pt-icon-standard pt-icon-menu" />
          Dashboard
          </h4>
      </div>
      </div>
    );
  }
}

export default SecNav;