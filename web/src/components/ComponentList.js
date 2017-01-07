import React from 'react';
import { Link } from 'react-router';
import provideApi from '../lib/provideApi';

function ComponentList({components}) {
  return (
    <nav className="navbar">
      <div className="navbar__title">Components</div>
      <div className="navbar__items">
        {components.map(component => (
          <Link key={component.name}
            to={`/component/${component.path}`}
            className="navbar__item"
            activeClassName="navbar__item--active">
            {component.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default provideApi(ComponentList,
  '/components',
  res => ({ components: res ? res.components : [] })
);