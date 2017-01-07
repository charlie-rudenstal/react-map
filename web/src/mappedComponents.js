import React from 'react';
import ReactDom from 'react-dom';
import components from '../../mappedComponents.gen.js';

const pathname = window.location.pathname;
const name = pathname.substring(
  '/render/component/'.length,
  pathname.lastIndexOf('.')
);

function getQueryParams() {
  const query = window.location.search;
  if (!query) return {};
  return query.substr(1).split('&').reduce((obj, strKeyValue) => {
    const keyValue = strKeyValue.split('=');
    obj[keyValue[0]] = keyValue[1];
    return obj;
  }, {});
}

console.log('Components', components);
console.log('Params', getQueryParams());

const component = components[name];
const element = React.createElement(component, getQueryParams());

ReactDom.render(
  <div>{element}</div>,
  document.getElementById('react-root')
);
