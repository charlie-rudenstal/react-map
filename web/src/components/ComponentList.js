import React from 'react';
import { Link } from 'react-router';
import { FileIcon } from './icons'
import provideApi from '../lib/provideApi';

export function ComponentList({components}) {
  return (
    <nav className="itemlist">
      {components.map(component => (
        <Link key={component.name}
          to={`/component/${component.path}`}
          className="itemlist__item"
          activeClassName="itemlist__item--active">
          <FileIcon /> {component.name}
        </Link>
      ))}
    </nav>
  );
}

export default provideApi(ComponentList,
  '/components',
  res => ({ components: res ? res.components : [] })
);