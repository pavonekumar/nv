import * as React from 'react';
import './MainNav.css';

class MainNav extends React.Component<{}, {}> {
  render() {
    return (
      <div className="MainNav">
      <div className="pt-button-group pt-large pt-fill">
  <a className="pt-button pt-intent-primary pt-active no-radius" role="button">Home</a>
  <a className="pt-button pt-intent-primary" role="button">Applications</a>
  <a className="pt-button pt-intent-primary" role="button">Reports</a>
  <a className="pt-button pt-intent-primary" role="button">Resource Library</a>
  <a className="pt-button pt-intent-primary" role="button">Forms</a>
  <a className="pt-button pt-intent-primary" role="button">News</a>
  <a className="pt-button pt-intent-primary" role="button">Directories</a>
  <a className="pt-button pt-intent-primary no-radius" role="button">Expand / Collapse
  <span className="pt-icon-standard pt-icon-caret-up pt-align-right" />
  <span className="pt-icon-standard pt-icon-caret-down pt-align-right" />
  </a>
      </div>
      </div>
    );
  }
}

export default MainNav;