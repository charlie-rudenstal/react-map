import React from 'react';
import ComponentList from '../ComponentList';
import PropList from '../PropList';

function RootPage({children}) {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar__title">
          React Map
        </div>
      </nav>
      <div className="dock">
        <div className="dock__item dock__item--left" style={{ minWidth: 250 }}>
          <div className="dock__title">Components</div>
          <ComponentList />
        </div>
        <div className="dock__item dock__item--middle">
          {children}
        </div>
        <div className="dock__item dock__item--right" style={{ minWidth: 250 }}>
          <div className="dock__title">Props</div>
          <PropList />
        </div>
      </div>
    </div>
  );
}

export default RootPage;
